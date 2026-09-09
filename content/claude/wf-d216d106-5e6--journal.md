---
title: "wf-d216d106-5e6 · journal"
---

Zero-channel layer with large bounds triggers an unbounded, uncharged allocation (OOM bomb) that bypasses every documented 2 GiB cap.

undo_prediction's 16-bit branch indexes plane[base]/plane[base+1] unconditionally, panicking on a zero-area (empty) plane in every build profile.

PsdRect::width()/height() compute right-left (bottom-top) as i32 from untrusted layer bounds, overflowing and panicking under overflow-checks (default cargo test / cargo-fuzz).

PSD/PSB import decompression bomb: paste_layer allocates a full canvas-sized Bgra8 buffer per layer based on the file's declared dimensions, defeating the reader's 2 GiB allocation caps. A tiny PSB declaring a huge canvas forces a multi-hundred-GB allocation and aborts the process.

DPI axes are not swapped when an EXIF orientation applies a 90 or 270 degree rotation during raster import. Orientation baking rotates the pixels and swaps width/height, but set_dpu copies the EXIF x/y DPI verbatim, leaving the resolution axes transposed relative to the corrected image.

The aggregate allocation guard charges a tag's RAW byte_count, but little_exif widens narrow-typed values of known wide-typed tags into a Vec 4x larger (INT8U -> Vec<u32>). This lets a blob pass the '2x body' budget while little_exif retains ~8x body, with peak allocation ~20x the blob size — bypassing the just-added aggregate cap.

Decompression-bomb guard under-counts: it checks decoder.total_bytes() (the NATIVE decoded size), but decode always expands to RGBA via to_pixel_buf (decode.rs:287-293), so a grayscale source allocates 4x (gray+alpha 2x, RGB 1.33x) the advertised 512 MiB MAX_ALLOC_BYTES budget the guard claims to enforce 'before any pixel buffer is allocated'.