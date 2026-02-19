
# 🐙 `@e280/octo`
> *tiny command orchestrator*

```bash
npm install @e280/octo
```
- octo started with the fancy `--ui` mode
- octo has since become e280's replacement for `npm-run-all`
- octo was previously part of our buildy-bundly-buddy, [`@e280/scute`](https://github.com/e280/scute)



<br/>

## 🦑 octo parallel — run commands all-at-once

### 🫧 run shell commands concurrently
```bash
octo parallel 'tsc -w' 'http-server x' 'node x/tests.test.js'
```

### 🫧 `--npm-run` for your package.json scripts
```bash
octo parallel --npm-run lint bundle test
```

### 🫧 `--ui` for a fancy interactive process viewer tui
```bash
octo parallel --ui 'tsc -w' 'http-server-x' 'node x/tests.test.js'
```
- ✨🆒✨ terminal interface with tabs for your watch routines
- yes, you can combine it with `--npm-run`
- press `[` and `]` to shimmy between tabs
- press `q` to quit



<br/>

## 🦑 octo sequence — run commands one-by-one

### 🫧 run shell commands sequentially
```bash
octo sequence 'rm -rf x' 'tsc' 'node x/tests.test.js'
```

### 🫧 `--npm-run` for your package.json scripts
```bash
octo sequence --npm-run clean tsc test
```



<br/>

## 🦑 octo shorts

```bash
octo p -n lint bundle test
```
- `p` === `parallel`
- `-n` === `--npm-run`

```bash
octo s -n lint bundle test
```
- `s` === `sequence`
- `-n` === `--npm-run`



<br/><br/>

## 💖 octo is by e280
reward us with github stars  
build with us at https://e280.org/ but only if you're cool  

