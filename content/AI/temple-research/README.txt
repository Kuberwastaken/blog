Temple research draft: reproducible aggregate analysis
Dataset: https://cdn.temple.com/research/hr_validation_study/data.zip
Copyright 2026 Temple Private Limited. Dataset licence: CC BY-NC 4.0.
No participant-level data is included in these assets.

Python 3; NumPy and Matplotlib for extended analysis and charts.
Unzip the original dataset, then run from this asset directory:
  python3 analysis.py /path/to/temple_heart_rate_validation_data > results.json
  python3 hr_extended.py /path/to/temple_heart_rate_validation_data
  python3 coverage.py /path/to/temple_heart_rate_validation_data
  mkdir -p img
  python3 plots_final.py /path/to/temple_heart_rate_validation_data

Clean scores use the supplied cleaned files, not an independently rebuilt cleaning pipeline.
Raw scores use valid values (36-240 bpm), mean within integer seconds, paired only where reference exists.
Device means weight participants equally; tail percentages pool paired seconds.
HR bands require >=30 seconds per person and report participant counts.
Bootstrap intervals resample people 5,000 times, seed 1.
Offset curves search -4..+8 seconds; this is an exploratory sensitivity check, not proof of clock error.
Charts for brain and age studies are transcribed reported results, not raw-data reruns.
