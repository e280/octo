
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

### 🐡 run concurrent shell commands
```bash
octo parallel 'tsc -w' 'http-server x' 'node --watch x/tests.test.js'
```

### 🐡 run concurrent package.json scripts
```bash
octo parallel --npm-run lint bundle test
```

### 🐡 ✨🆒✨ fancy interactive process viewer tui
```bash
octo parallel --ui 'tsc -w' 'http-server-x' 'node --watch x/tests.test.js'
```
- terminal user interface
- press `[` and `]` to shimmy between tabs
- press `q` to quit
- yes, you can combine it with `--npm-run`



<br/>

## 🦑 octo sequence — *run commands one-by-one*

### 🐡 run sequential shell commands
```bash
octo sequence 'rm -rf x' 'tsc' 'node x/tests.test.js'
```

### 🐡 run sequential package.json scripts
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
- `-n` === `--npm-run`
- `-u` === `--ui`



<br/><br/>

## 💖 octo is by e280
reward us with github stars  
build with us at https://e280.org/ but only if you're cool  

