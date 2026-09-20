# askforvini.pw

Portfolio for Vinicius (Santa Cruz de la Sierra, Bolivia). Locale follows `Accept-Language` (`es*` → Spanish, otherwise English). Theme follows local hour: dark 18:00–05:59, light 06:00–17:59.

## Run

Official Node LTS (v24) may live at `~/.local/node` on this machine:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd /Users/ice/Downloads/askforvini.pw
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Routes: `/es`, `/en`. Shabbat overrides: `?shabbat=1` and `?shabbat=0`. In development only, force theme with `?theme=light` or `?theme=dark`.

```bash
npm test
npm run build
```
