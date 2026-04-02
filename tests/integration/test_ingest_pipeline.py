from pathlib import Path

from scripts.ingest import build_chunks, discover_mdx_files, parse_module_name


def test_discover_mdx_files_and_parse_module() -> None:
    files = discover_mdx_files(Path('docs'))
    assert files
    assert all(path.suffix == '.mdx' for path in files)

    module = parse_module_name(Path('docs/module-2-simulation/overview.mdx'))
    assert module == 'module-2-simulation'


def test_build_chunks_returns_non_empty_for_existing_lesson() -> None:
    chunks = build_chunks(Path('docs/module-1-ros2/overview.mdx'))
    assert chunks
    assert all(chunk.strip() for chunk in chunks)
