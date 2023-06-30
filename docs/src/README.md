# Dokumentation
## Install dependencies
```bash
# Font
curl https://www.tug.org/fonts/getnonfreefonts/install-getnonfreefonts > /tmp/install-getnonfreefonts
sudo texlua /tmp/install-getnonfreefonts
sudo getnonfreefonts --sys -a

# Packages
sudo tlmgr install latexmk ucs sectsty apacite titling blindtext todonotes texcount
```

## Create issue table
1. Export issues from gitlab
2. Move file to `../appendix/todo_gitlab_issues.csv`
3. Install requirements `pip3 install -r requirements.txt`
4. Run script `python3 csv_to_latex.py`

## Create API docs
1. Start the backend
2. Execute the generate swagger docs script: `./generate_swagger_docs.sh`

## Make PDF
```bash
# Create all
make all

# Preview and watch for changes
make watch
```
