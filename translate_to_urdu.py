#!/usr/bin/env python3
"""
Script to translate MDX files to Roman Urdu using Groq API
"""
import os
import re
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Initialize Groq client
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def translate_paragraph(paragraph, max_retries=3):
    """Translate a single paragraph to Roman Urdu."""
    if len(paragraph.strip()) < 10:  # Skip very short lines
        return paragraph

    system_prompt = (
        "You are a Roman Urdu translator. Translate ONLY the given sentence to Roman Urdu. "
        "Keep these words in English: ROS2, SLAM, LiDAR, Node, Topic, QoS, Gazebo, Isaac, VLA, Python, C++. "
        "Keep all code blocks, URLs, headings structure in English. "
        "Output ONLY the Roman Urdu translation. Nothing else."
    )

    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                temperature=0.1,
                max_tokens=200,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": paragraph},
                ],
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            if attempt == max_retries - 1:
                print(f"Failed to translate after {max_retries} attempts: {e}")
                return paragraph  # Return original if all retries fail
            print(f"Retrying translation ({attempt + 1}/{max_retries}): {e}")

    return paragraph

def process_mdx_file(file_path):
    """Process an MDX file and translate it to Roman Urdu."""
    print(f"Processing: {file_path}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split content into lines to preserve structure
    lines = content.split('\n')

    # Identify frontmatter section (between ---)
    frontmatter_start = -1
    frontmatter_end = -1
    for i, line in enumerate(lines):
        if line.strip() == '---':
            if frontmatter_start == -1:
                frontmatter_start = i
            elif frontmatter_end == -1:
                frontmatter_end = i
                break

    # Process content outside frontmatter
    processed_lines = []

    i = 0
    while i < len(lines):
        line = lines[i]

        # Preserve frontmatter as-is
        if frontmatter_start != -1 and frontmatter_end != -1 and frontmatter_start <= i <= frontmatter_end:
            processed_lines.append(line)
            i += 1
            continue

        # Preserve code blocks as-is
        if line.strip().startswith('```'):
            # Add the opening code fence
            processed_lines.append(line)
            i += 1

            # Add all lines until closing fence
            while i < len(lines) and not lines[i].strip().startswith('```'):
                processed_lines.append(lines[i])
                i += 1

            # Add the closing code fence
            if i < len(lines):
                processed_lines.append(lines[i])
            i += 1
            continue

        # Preserve headings, lists, and other markdown elements
        stripped_line = line.strip()
        if (stripped_line.startswith('#') or  # Headings
            stripped_line.startswith('- ') or  # Lists
            stripped_line.startswith('* ') or  # Lists
            stripped_line.startswith('1. ') or  # Numbered lists
            stripped_line.startswith('|') or  # Tables
            stripped_line.startswith('>') or  # Blockquotes
            line.strip() == '' or  # Empty lines
            stripped_line.startswith('[') and ']:'):  # Link definitions
            processed_lines.append(line)
        else:
            # Translate regular text
            translated = translate_paragraph(line)
            processed_lines.append(translated)

        i += 1

    # Join the processed lines back
    translated_content = '\n'.join(processed_lines)

    # Save the translated content
    output_path = Path("docs-urdu") / file_path.relative_to("docs")
    os.makedirs(output_path.parent, exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(translated_content)

    print(f"Saved translated file: {output_path}")

def main():
    """Main function to process all MDX files."""
    docs_dir = Path("docs")
    mdx_files = list(docs_dir.rglob("*.mdx"))

    print(f"Found {len(mdx_files)} MDX files to translate")

    for mdx_file in mdx_files:
        process_mdx_file(mdx_file)

    print("Translation complete!")

if __name__ == "__main__":
    main()