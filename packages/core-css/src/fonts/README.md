# JetBrains Mono

`JetBrainsMono.woff2` is a subset of the upright variable font from
[JetBrains Mono v2.304](https://github.com/JetBrains/JetBrainsMono/releases/tag/v2.304),
licensed under the SIL OFL 1.1 (`OFL.txt`).

It keeps Latin, punctuation, currency, arrows, and box, block, and geometric-shape
characters at weights 100–800. Other scripts, stylistic alternates, and coding
ligatures are dropped. Rebuild it with [fontTools](https://github.com/fonttools/fonttools):

```sh
pyftsubset "fonts/variable/JetBrainsMono[wght].ttf" \
  --unicodes="U+0000-024F,U+0259,U+02B0-036F,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2100-21FF,U+2500-25FF,U+FFFD" \
  --layout-features="ccmp,locl,mark,mkmk,kern" \
  --flavor=woff2 --output-file=JetBrainsMono.woff2
```

If you change `--unicodes`, match the `unicode-range` in `../fonts.css`.
