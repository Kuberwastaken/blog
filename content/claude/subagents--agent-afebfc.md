---
title: "subagents · agent-afebfc"
---

You are an implementer on the Kube project (a Rust image editor). Work EXCLUSIVELY in the git worktree /root/dev/scratch/kube-wt-nrbf (branch unit/2.1-nrbf, checked out). Never touch /root/dev/scratch/kube. Host: Raspberry Pi 5 (aarch64, 4 cores, Rust 1.97, edition 2024). Another build may run concurrently — use `cargo nextest run -p kube-nrbf` and `-p` scoped commands only.

## Unit 2.1 — `kube-nrbf`: MS-NRBF reader (the .pdn crown-jewel foundation)

Read first (in the worktree):
- `docs/specs/pdn-format.md` — §2 (the 12-record subset paint.net emits), §3 (object graph), §5 (reader requirements). THE contract.
- The public MS-NRBF specification structure is your normative grammar reference; you know this format (it is the .NET BinaryFormatter remoting wire format, [MS-NRBF]). Implement from the public grammar.
- `crates/kube-nrbf/` — the stub you fill.

**Never read anything under `refs/`** (clean-room policy). The committed corpus manifest fixtures ARE available: `fixtures/pdn-corpus-expected.json` (not needed for this unit) and — for integration tests — real .pdn bytes are NOT available to you; test with synthetic NRBF streams you construct byte-by-byte in tests.

### Deliverables (crates/kube-nrbf, `#![forbid(unsafe_code)]`, zero non-workspace deps; `thiserror` allowed via workspace)

1. **Grammar layer.** Parse a complete MS-NRBF stream from `&[u8]`. Support AT MINIMUM these records (the paint.net subset), with the full record-type enum defined and unsupported-but-recognized types returning a structured error (never panic): SerializedStreamHeader(0), ClassWithId(1), SystemClassWithMembersAndTypes(4), ClassWithMembersAndTypes(5), BinaryObjectString(6), BinaryArray(7), MemberPrimitiveTyped(8), MemberReference(9), ObjectNull(10), MessageEnd(11), BinaryLibrary(12), ObjectNullMultiple256(13), ObjectNullMultiple(14), ArraySinglePrimitive(15), ArraySingleObject(16), ArraySingleString(17). BinaryTypeEnum (Primitive=0, String=1, Object=2, SystemClass=3, Class=4, ObjectArray=5, StringArray=6, PrimitiveArray=7) and AdditionalInfo per type. PrimitiveTypeEnum with at least Boolean(1), Byte(2), Char(3), Double(6), Int16(7), Int32(8), Int64(9), SByte(10), Single(11), TimeSpan(12), DateTime(13), UInt16(14), UInt32(15), UInt64(16), Null(17), String(18). 7-bit length-prefixed UTF-8 strings (LengthPrefixedString). BinaryArray with ArrayTypeEnum (Single=0, Jagged=1, Rectangular=2, SingleOffset=3, JaggedOffset=4, RectangularOffset=5) — implement Single fully; others parse structurally (lengths/offsets) with element reading for object elements; multi-rank may return Unsupported error if genuinely hard, but structure must be consumed correctly for Single.
2. **Object model.** `NrbfStream { root_id: i32, libraries: BTreeMap<i32, String>, objects: BTreeMap<i32, NrbfObject> }`; `NrbfObject::Class { class: ClassRef, members: Vec<(String, NrbfValue)> } | ObjectArray(Vec<NrbfValue>) | PrimitiveArray(PrimVec) | StringArray(...) | String(String)`; `NrbfValue::{Null, Bool(bool), Byte(u8), I16/I32/I64/U16/U32/U64, F32, F64, Char(char), String(String), DateTime/TimeSpan raw i64, Ref(i32), Inline(Box<NrbfObject>) or InlineId(i32)...}` — design tastefully; class metadata (name, member names, member types, library id) deduped in a `ClassDef` table keyed by object id, `ClassWithId` referencing it. Provide `resolve(&self, &NrbfValue) -> Option<&NrbfObject>` for Ref chasing and a convenience `class_member(&self, obj, "name")` lookup.
3. **Parser entry**: `NrbfStream::parse(bytes: &[u8]) -> Result<(NrbfStream, usize), NrbfError>` returning the stream AND the byte offset one past MessageEnd (callers need trailing data — .pdn puts pixel blobs after MessageEnd). Strictness per spec §5: allocation caps — never pre-allocate more than remaining input length for arrays/strings (check declared lengths against `bytes.len() - pos` before allocating; element-count based collections use `min(declared, remaining)` capacity growth); all errors carry byte offset; NO panics on any input (including truncation mid-record) — return errors.
4. **Tests** (`tests/` + unit tests):
   - Hand-built byte streams: a minimal header+library+class-with-members-and-types(primitives bool/i32/i64)+string member+MessageEnd roundtrip of parsing; MemberReference forward AND backward references; ArraySingleObject with ObjectNullMultiple256 padding; nested class (member of type Class containing inline object); BinaryArray Single of class refs; SystemClassWithMembersAndTypes (System.Version with 4 i32s named Major/Minor/Build/Revision).
   - Error paths: truncated at every record boundary of the minimal stream (loop over prefix lengths asserting Err not panic); declared string length > remaining; array length i32::MAX (must not OOM — allocation-cap test); unknown record type byte.
   - Proptest: arbitrary byte soup (up to 64KiB) never panics (returns Ok or Err within time); also parse(valid_stream + arbitrary trailing garbage) returns correct end offset.
5. **Docs**: crate-level docs explaining scope (read full grammar subset, write comes in unit 2.2), the object model, and a doc example constructing + parsing a tiny stream.

### House rules
- `cargo fmt --all`, `cargo clippy -p kube-nrbf --all-targets` zero warnings, `cargo nextest run -p kube-nrbf` green.
- Sequential conventional commits as you go (e.g. `feat(kube-nrbf): record grammar + primitive readers` → `feat(kube-nrbf): object model + reference resolution` → `test(kube-nrbf): synthetic streams, truncation, allocation caps` → `docs(kube-nrbf): crate docs + example`). Do NOT push, do NOT squash/amend.
- If the MS-NRBF grammar and docs/specs/pdn-format.md ever seem to conflict, the public MS-NRBF grammar wins for parsing; report the discrepancy in your final report.

### Final report
Dense: API surface summary, record coverage table, test count + notable edge cases covered, clippy/fmt status, commit list (hash + message), open questions for the writer unit (2.2).