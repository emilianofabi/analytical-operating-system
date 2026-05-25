# AOS Quick Reference

## 1. Universal runner

`ops/aos.ps1` is the preferred runner for the Analytical Operating System.
Prefer prompt files over long inline prompts.

## 2. Markdown output example

```powershell
.\ops\aos.ps1 -PromptFile ".\prompts\portfolio\ai_writing_assistant_case_study.prompt.txt" -OutFile ".\artifacts\portfolio\case_studies\ai_writing_assistant_memo_case_study.md" -ExpectedType "markdown" -Force
```

## 3. JSON output example

```powershell
.\ops\aos.ps1 -PromptFile ".\prompts\state_updates\example.prompt.txt" -OutFile ".\artifacts\generated\state_updates\example.json" -ExpectedType "json" -Force
```

## 4. Auditor skill example

```powershell
.\ops\aos.ps1 -Skill "curriculum-auditor" -PromptFile ".\prompts\audits\example_semantic_audit.prompt.txt" -OutFile ".\audits\semantic\example.semantic_audit.md" -ExpectedType "markdown" -Force
```

## 5. Git checkpoint commands

```bash
git status
git add README.md AOS-QUICK-REF.md
git commit -m "docs: document universal AOS workflow"
git push
```

## 6. Rules

- Do not commit test artifacts.
- Do not commit logs or quarantine files.
- Do not commit broken Hermes outputs.
- Commit only clean, intentional artifacts.
