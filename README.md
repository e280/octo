
![](https://i.imgur.com/M0zNgLw.png)

![](https://i.imgur.com/jhDxfad.png)



<br/>

# 🐙 octo — *tiny command orchestrator*

```bash
npm install --save-dev @e280/octo
```



<br/>

### 🦑 octo
```bash
octo 'tsc -w' 'scute -wv' 'http-server x' 'node --watch x/test.js'
```
- run commands all-at-once, in a fancy tui ✨🆒✨
- press `[` and `]` to shimmy between tabs (or numbers or h,j,k,l,a,d)
- press `q` or `ctrl-c` to quit



<br/>

### 🦑 octo-parallel *(or octo-p)*
```bash
octo-parallel 'tsc -w' 'scute -wv' 'http-server x' 'node --watch x/test.js'
```
- run commands all-at-once, no tui



<br/>

### 🦑 octo-sequence *(or octo-s)*
```bash
octo-sequence 'tsc' 'scute -v' 'node x/test.js'
```
- run commands one-by-one, no tui



<br/>

### 💫 --npm-run *(or -n)*
```bash
octo --npm-run 'tsc-watch' 'scute-watch' 'server-watch' 'test-watch'
```
- for calling package.json scripts instead of shell commands
- works on `octo`, `octo-parallel`, `octo-sequence`



<br/>

## 🧑‍💻 octo is by e280
reward us with github stars  
build with us at https://e280.org/ but only if you're cool  

