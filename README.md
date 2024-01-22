# Ejecucion del sistema 


## Fronted

```cmd
npm install
npm run dev
npm run dev -- --host 192.168.2.135 --port 3000
```

## Backend



```cmd
pip install -r .\requirements.txt
uvicorn app.main:app --reload
uvicorn app.main:app --reload --host 192.168.2.135 --port 8000
```