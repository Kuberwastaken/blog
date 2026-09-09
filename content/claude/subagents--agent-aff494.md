---
title: "subagents · agent-aff494"
---

You are an implementer on the Kube project (Rust image editor). Work EXCLUSIVELY in the git worktree /root/dev/scratch/kube-wt-tile (branch unit/1.4-tile, checked out). Never touch /root/dev/scratch/kube. Host: Raspberry Pi 5 (aarch64, 4 cores, 16GB, Rust 1.97, edition 2024). Other builds may run concurrently — scope all cargo commands with `-p kube-tile`.

## Unit 1.4 + 1.5 + 1.5b — `kube-tile`: handle-based COW tile store with disk spill + recovery journal

Read FIRST and implement EXACTLY:
- `docs/specs/tile-store.md` — THE normative API + semantics contract (TileId, guards, COW, uniform tiles, spill/LRU, journal format, recovery, torn-write matrix). Deviations require reporting, not improvising.
- `docs/ARCHITECTURE.md` §"The tile model" for rationale.
- `crates/kube-tile/` stub; `crates/kube-pixel` is merged — depend on it for `Bgra8`.

**Never read anything under `refs/`.**

### Key implementation guidance (binding)
- `kube-tile` is one of the two unsafe-permitted crates, but prefer safe code: `parking_lot` (workspace dep) for locks, plain `Box<[Bgra8]>` buffers. Use `unsafe` ONLY if a measured need arises — report if you do (expected: zero unsafe).
- Structure: `TileStore` holds a `parking_lot::RwLock<Registry>` for the id→entry map plus per-entry `Arc<TileEntry>` where `TileEntry` has its own lock for pixel state (`Uniform(Bgra8) | Resident(Box<TileData>) | Spilled{offset,len}`), so guards on different tiles never contend on the registry lock beyond the map lookup. Refcounted sharing: entries carry a handle-refcount; `share` bumps it; COW state = multiple TileIds mapping to one entry vs entry cloned on write — design per spec §2: `share(id) -> TileId` new handle to same pixels; `write(id)` clones the pixel buffer first when the underlying entry is shared by >1 live handle.
- LRU: an intrusive-enough approximation is fine (e.g. global monotonic touch counter per entry + eviction scan picking oldest unpinned resident entries until under budget). O(n) eviction scan acceptable in v1; document it.
- Spill file: `tempfile::tempfile()`-style anonymous file by default BUT the journal (spec §7) requires a named path + recovery — API: `TileStore::new(SpillConfig)` where `SpillConfig::ephemeral()` (temp) and `SpillConfig::journaled(path)` (named, append-only chunks `[u32 magic|u64 tile_id|u32 len|payload|u32 crc32]`, fsync on `checkpoint()`, `TileStore::recover(path)` per spec; implement crc32 inline (small const-table implementation, ~30 lines, no new dependency — document the polynomial 0xEDB88320).
- `TILE_EDGE = 256` const; `TileData` = `[Bgra8; TILE_EDGE*TILE_EDGE]` boxed (256KiB per tile).
- Errors via `thiserror` (workspace). No panics on I/O paths.
- Uniform-tile fast path per spec §5 (alloc_uniform stores just the color; materializes on first write; `uniform_color(id)`).
- RAII convenience `TileHandle<'s>` owning release-on-drop (spec §3).

### Tests (the acceptance) — all from spec §"Properties to test":
COW clone-iff-shared (mutate one handle, other unchanged; `#[cfg(test)] is_shared` hook); share is O(1) (no pixel copies — expose `#[cfg(test)]` clone counter); spill round-trip byte-identical under forced tiny budget (proptest over sizes/orders); history-spill scenario (N held handles as history, exceed budget, evictions happen — expose `#[cfg(test)] resident_bytes()` — re-reads identical); guard pinning (budget 0 + live read guard → tile stays readable/unchanged); torn-write matrix (write tiles, checkpoint, then truncate the journal file at EVERY byte offset within the last chunk via proptest/loop → `recover` returns all complete tiles, errors never, torn tail dropped); uniform tiles O(1) memory (alloc 1M uniform, assert resident_bytes ~0); concurrent disjoint writes (spawn threads writing different tiles simultaneously — use std::thread; assert all writes land).

### Bench (`benches/tile.rs`, criterion `{ workspace = true, features = ["cargo_bench_support"] }`, harness=false, `bench=false` on lib/tests):
alloc_uniform, share, first-write COW clone, read hot, page-in cold from spill, eviction throughput; at TILE_EDGE 256 (const — parameterized 512 variant may be a follow-up; just bench 256). sample_size(20), short measurement. Run once with --quick and record numbers in your report.

### House rules
`cargo fmt --all`, `cargo clippy -p kube-tile --all-targets` zero warnings, `cargo nextest run -p kube-tile` green. Sequential conventional commits (suggested: `feat(kube-tile): handle registry, COW entries, guards` → `feat(kube-tile): LRU spill + budget` → `feat(kube-tile): journal + recovery` → `test(kube-tile): COW/spill/pinning/torn-write properties` → `bench(kube-tile): store ops`). No push, no squash. If the spec is ambiguous or infeasible somewhere, STOP on that item and report precisely.

### Final report
API surface, semantics decisions made within spec latitude, test counts + what each property proves, torn-write matrix result, bench table, clippy/fmt status, commit list, any unsafe used (expected none), open questions for kube-core integration.