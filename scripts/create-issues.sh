#!/usr/bin/env bash
# Cria no GitHub uma issue por ficheiro em issues/. Requer `gh auth login` no repositório certo.
set -euo pipefail
cd "$(dirname "$0")/../issues"
REPO="${REPO:-$(grep -m1 "\"repo\"" ../project.config.json | cut -d\" -f4)}"
for l in bug enhancement feature; do gh label create "$l" --repo "$REPO" 2>/dev/null || true; done
for f in *.md; do
  t=$(grep -m1 '^title:' "$f" | cut -d: -f2- | sed 's/^ *//')
  b=$(grep -m1 '^body:' "$f" | cut -d: -f2- | sed 's/^ *//')
  k=$(grep -m1 '^type:' "$f" | cut -d: -f2-)
  case "$k" in bug) l=bug;; improvement) l=enhancement;; *) l=feature;; esac
  gh issue create --repo "$REPO" --title "$t" --body "$b" --label "$l"
done
