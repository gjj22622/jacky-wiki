#!/usr/bin/env python3
"""Validate the minimum decision-complete fields in a course brief."""

from pathlib import Path
import re
import sys

REQUIRED_LABELS = [
    "日期／時段",
    "場合／主辦",
    "受眾／人數",
    "互動強度",
    "可檢查成功指標 O",
    "限制／紅線",
    "主課型",
    "必需模組",
    "禁止誤套",
]


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: validate_course_brief.py <brief.md>")
        return 2
    path = Path(sys.argv[1])
    if not path.is_file():
        print(f"ERROR: file not found: {path}")
        return 2
    text = path.read_text(encoding="utf-8")
    missing = [label for label in REQUIRED_LABELS if label not in text]
    placeholders = sorted(set(re.findall(r"<[^>]+>", text)))
    blank_rows = []
    for line in text.splitlines():
        if line.startswith("|") and re.search(r"\|\s*\|$", line):
            first = line.split("|")[1].strip()
            if first in REQUIRED_LABELS:
                blank_rows.append(first)
    if missing or placeholders or blank_rows:
        if missing:
            print("MISSING LABELS: " + ", ".join(missing))
        if placeholders:
            print("UNRESOLVED PLACEHOLDERS: " + ", ".join(placeholders))
        if blank_rows:
            print("BLANK REQUIRED VALUES: " + ", ".join(blank_rows))
        return 1
    print("OK: course brief contains the required routing fields")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
