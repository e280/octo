
![](https://i.imgur.com/M0zNgLw.png)



<br/>

> [!IMPORTANT]
> octo is a work in progress right now, we haven't yet published the first version.



<br/>

# 🐙 octo — *tiny command orchestrator*

```bash
npm install --save-dev @e280/octo
```
- run watch tasks together in a fancy tabby tui (tsc, http-server, scute, tests, etc)
- run package.json scripts in parallel or sequence (goodbye `npm-run-all` 🫡)
- octo was originally born in [`@e280/scute`](https://github.com/e280/scute)



<br/>

## 🦑 octo parallel — *run commands all-at-once*

```bash
octo parallel 'tsc -w' 'http-server x' 'node --watch x/tests.test.js'
```

```bash
# run your npm scripts
octo parallel --npm-run lint bundle test
```

```bash
# ✨🆒✨ fancy terminal user interface
octo parallel --ui 'tsc -w' 'http-server-x' 'node --watch x/tests.test.js'
```
- press `[` and `]` to shimmy between tabs
- press `q` to quit
- yes, you can combine it with `--npm-run`

##### example --ui split view
```
┌─ 1! tsc -w ──────────────────────────┐
│ s/foo.ts:12 error TS2339             │
│ s/bar.ts:44 error TS2322             │
└────────────────────────────────23415─┘
┌─ 2• scute -wv ───────────────────────┐
│ html x/index.html                    │
│ time 129 ms                          │
└────────────────────────────────23416─┘
┌─ 3• node --watch x/tests.js ─────────┐
│ ✅ 21 happy tests - 61 ms            │
│                                      │
└────────────────────────────────23417─┘
  🐙 (s) 1!  2•  3•
```

##### example --ui process view
```
s/foo.ts:12 error TS2339
s/bar.ts:44 error TS2322
  🐙  s (1!) 2•  3•         23415 tsc -w
```

##### process status indicators
- `•` running, got stdout
- `!` running, got stderr
- `◦` done (exit zero)
- `x` failed (exit non-zero)



<br/>

## 🦑 octo sequence — *run commands one-by-one*

```bash
octo sequence 'rm -rf x' 'tsc' 'node x/tests.test.js'
```

```bash
# run your npm scripts
octo sequence --npm-run clean tsc test
```



<br/>

## 🦑 octo aliases

```bash
octo p -nu lint bundle test
octo s -n lint bundle test
```
- `p` === `parallel`
- `s` === `sequence`
- `-n` === `--npm-run`
- `-u` === `--ui`



<br/><br/>

## 💖 octo is by e280
reward us with github stars  
build with us at https://e280.org/ but only if you're cool  

