# Idea — Local Setup

This repo contains a Python FastAPI backend and a Next.js web frontend located in `app/web`.

## Requirements

- Python 3.8+ (recommended 3.11+)
- Node.js 18+ and `pnpm`

## Quick setup (macOS)

1. Create and activate a Python virtual environment from the repository root:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Install web dependencies and run the frontend:

```bash
cd app/web
pnpm install
pnpm dev
```

4. Start the backend (run from repository root, in a separate terminal with the venv active):

```bash
uvicorn app.api.main:app --reload --host 127.0.0.1 --port 8000
```

You should then be able to access the frontend (usually on http://localhost:3000) and the API at http://127.0.0.1:8000.

## Example one-shot setup script

Save this snippet as `scripts/setup.sh` and run `bash scripts/setup.sh` (make it executable with `chmod +x scripts/setup.sh`) to perform the common setup steps automatically.

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Creating Python virtualenv..."
python -m venv .venv
echo "Activating virtualenv..."
source .venv/bin/activate
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Installing web dependencies..."
pushd app/web >/dev/null
pnpm install
popd >/dev/null

echo "Setup complete.\nTo run backend: activate venv and run:\n  uvicorn app.api.main:app --reload --host 127.0.0.1 --port 8000\nTo run frontend: cd app/web && pnpm dev"

```

## Notes

- If you prefer Docker, you can containerize the services; this repo does not include Dockerfiles by default.
- Adjust Python/Node versions to match your environment.
