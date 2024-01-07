# Dashlog Ausführungsanleitung

Im Folgenden wir erklärt, wie die Anwendung gestartet wird

## Voraussetzungen

- [Docker](https://www.docker.com/get-started) muss auf dem System installiert sein.

## Schritte

1. **Repo klonen:**

   ```bash
   git clone https://github.com/ke90/DashLog3.git
   ```

2. **In das Projektverzeichnis wechseln:**
   ```bash
   cd DashLog3
   ```
3. **Starten der Produktiv-Container:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```
4. **Stoppen der Produktiv-Container:**
   ```bash
   docker-compose -f docker-compose.prod.yml down -v
   ```
