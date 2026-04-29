# Predicteer — Herramienta de Diagnóstico de Feria

Calculadora interactiva para marcas de moda en ferias tipo EVA. Diagnostica pérdidas por inventario sobrante y churn de clientes.

## Setup rápido

```bash
npm install
npm run dev
```

## Antes de deployar: 2 variables que debes cambiar

### 1. Webhook de Make.com
En `src/components/LeadModal.jsx`, línea 9:
```js
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/TU_WEBHOOK_ID_AQUI'
```
Reemplaza `TU_WEBHOOK_ID_AQUI` con el ID real de tu webhook en Make.com.

### 2. Número de WhatsApp de Predicteer
En `src/components/LeadModal.jsx`, línea 12:
```js
const WHATSAPP_NUMBER = '573001234567'
```
Y en `src/components/SuccessScreen.jsx`, línea 5:
```js
const WHATSAPP_NUMBER = '573001234567'
```
Reemplaza `573001234567` con tu número real (código de país + número, sin + ni espacios).

## Deploy en Vercel

1. Sube este repo a GitHub
2. En Vercel → New Project → importa el repo
3. Vercel detecta Vite automáticamente
4. Deploy

## Configurar Make.com (recibir leads en Google Sheets)

1. Crea un nuevo Scenario en Make.com
2. Módulo 1: **Webhooks → Custom Webhook** → copia la URL generada
3. Módulo 2: **Google Sheets → Add a Row**
   - Conecta tu Google account
   - Selecciona tu spreadsheet "Leads Predicteer Feria"
   - Mapea las columnas:
     - nombre → Nombre
     - marca → Marca
     - correo → Correo
     - whatsapp → WhatsApp
     - modulo → Módulo
     - perdida_calculada → Pérdida Calculada
     - perdida_formateada → Pérdida Formateada
     - fecha → Fecha
     - fuente → Fuente
4. Activa el escenario (toggle ON)
5. Pega la URL del webhook en LeadModal.jsx

## Stack

- React 18 + Vite
- Tailwind CSS v3
- @phosphor-icons/react
- Fuentes: Outfit + DM Sans (Google Fonts)
