import pandas as pd

csv_table = pd.read_csv("../appendix/todo_gitlab_issues.csv")
subset = csv_table[['Title', 'Assignee']]

with open("gitlab_issue_table.tex", 'w') as f:
    f.write(subset.to_latex(
            index=False,
            longtable=True,
            label='GitLab Issues'
        ).replace('[', '').replace(']', ''))
