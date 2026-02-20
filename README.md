
![](https://i.imgur.com/M0zNgLw.png)



<br/>

> [!IMPORTANT]
> octo is a work in progress right now, we haven't yet published the first version.



<br/>

# 🐙 octo — *tiny command orchestrator*

```bash
npm install @e280/octo
```
- run watch tasks together with `parallel --ui` (tsc, http-server, scute, tests, etc)
- run package.json scripts in parallel or sequence (goodbye `npm-run-all` 🫡)
- octo was originally born in [`@e280/scute`](https://github.com/e280/scute)



<br/>

## 🦑 octo parallel — *run commands all-at-once*

### 🫧 run shell commands concurrently
```bash
octo parallel 'tsc -w' 'http-server x' 'node --watch x/tests.test.js'
```

### 🫧 `--npm-run` for your package.json scripts
```bash
octo parallel --npm-run lint bundle test
```

### 🫧 `--ui` for a fancy interactive process viewer tui
```bash
octo parallel --ui 'tsc -w' 'http-server-x' 'node --watch x/tests.test.js'
```
- ✨🆒✨ terminal interface with tabs for your watch routines
- yes, you can combine it with `--npm-run`
- press `[` and `]` to shimmy between tabs
- press `q` to quit



<br/>

## 🦑 octo sequence — *run commands one-by-one*

### 🫧 run shell commands sequentially
```bash
octo sequence 'rm -rf x' 'tsc' 'node x/tests.test.js'
```

### 🫧 `--npm-run` for your package.json scripts
```bash
octo sequence --npm-run clean tsc test
```



<br/>

## 🦑 octo aliases

```bash
octo p -n -u lint bundle test
octo s -n lint bundle test
```
- `p` === `parallel`
- `s` === `sequence`
- `-u` === `--ui`
- `-n` === `--npm-run`



<br/><br/>

## 💖 octo is by e280
reward us with github stars  
build with us at https://e280.org/ but only if you're cool  

