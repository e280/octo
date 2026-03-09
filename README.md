
![](https://i.imgur.com/M0zNgLw.png)



<br/>

> [!IMPORTANT]
> octo is a work in progress right now, we haven't yet published the first version.



<br/>

# 🐙 octo — *tiny command orchestrator*

```bash
npm install --save-dev @e280/octo
```

### ✨🆒✨ run commands all-at-once, fancy tui
```bash
octo 'tsc -w' 'scute -wv' 'http-server x' 'node --watch x/test.js'
```
- press `[` and `]` to shimmy between tabs (or numbers or h,j,k,l,a,d)
- press `q` or `ctrl-c` to quit

### run commands all-at-once, headlessly, no tui
```bash
octo-parallel 'tsc -w' 'scute -wv' 'http-server x' 'node --watch x/test.js'
```

### run commands one-by-one, no tui
```bash
octo-sequence 'tsc' 'scute -v' 'node x/test.js'
```

### --npm-run
```bash
octo --npm-run 'tsc-watch' 'scute-watch' 'server-watch' 'test-watch'
```
- `-n` for short
- for calling package.json scripts instead of shell commands
- works on `octo`, `octo-parallel`, `octo-sequence`

### aliases
- `octo-p` === `octo-parallel`
- `octo-s` === `octo-sequence`



<br/><br/>

## 💖 octo is by e280
reward us with github stars  
build with us at https://e280.org/ but only if you're cool  

