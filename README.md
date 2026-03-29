# 🧪 Playwright E2E Testing - SauceDemo

[![Playwright Tests](https://github.com/CeciKuni/playwright-sauce-demo/actions/workflows/playwright.yml/badge.svg)](https://github.com/CeciKuni/playwright-sauce-demo/actions/workflows/playwright.yml)

📊 **[Ver último reporte de tests](https://cecikuni.github.io/playwright-sauce-demo/)**

Proyecto de automatización de pruebas end-to-end utilizando Playwright, enfocado en validar flujos completos de usuario y lógica de negocio sobre la aplicación SauceDemo.

---

## 🚀 Tecnologías utilizadas

- Playwright
- TypeScript
- Page Object Model (POM)

---

## 📌 Objetivo del proyecto

Simular un flujo real de usuario en un e-commerce, validando:

- Autenticación
- Selección de productos
- Lógica de filtrado por precio
- Gestión de carrito
- Checkout completo
- Validaciones de negocio (cálculos y errores)

---

## 🧩 Casos automatizados

### 🔐 Login

- Login exitoso
- Login con credenciales inválidas
- Login con usuario bloqueado

### 🛒 Inventory

- Ordenamiento de productos por precio
- Selección dinámica de productos según condición (precio < 10 USD)

### 🧺 Carrito

- Validación de productos agregados
- Eliminación de productos
- Verificación de precios

### 💳 Checkout

- Flujo completo de compra
- Validación de cálculo: `total = item total + tax`
- Validación de campos obligatorios (ej: código postal)

---

## 🧠 Buenas prácticas implementadas

- Page Object Model (POM)
- Separación de datos de prueba (`testData`)
- Uso de locators estables (`data-test`)
- Validaciones dinámicas (no hardcodeadas)
- Tests independientes y mantenibles

---
