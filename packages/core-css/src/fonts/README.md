# JetBrains Mono

`JetBrainsMono.woff2` is a subset of the upright variable font from the
[JetBrains Mono v2.304 release](https://github.com/JetBrains/JetBrainsMono/releases/tag/v2.304),
licensed under the SIL Open Font License 1.1 (`OFL.txt`).

The subset keeps Latin, punctuation, currency, arrows, and box and block
characters, with the full 100–800 weight axis. It drops other scripts, the
stylistic alternates, and the coding ligatures, so text renders exactly as
written. Rebuild or widen it with [fontTools](https://github.com/fonttools/fonttools):

```sh
pyftsubset "fonts/variable/JetBrainsMono[wght].ttf" \
  --unicodes="U+0000-024F,U+0259,U+02B0-036F,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2100-21FF,U+2500-259F,U+FFFD" \
  --layout-features="ccmp,locl,mark,mkmk,kern" \
  --flavor=woff2 --output-file=JetBrainsMono.woff2
```

If you widen `--unicodes`, update the `unicode-range` in `../fonts.css` to match.
