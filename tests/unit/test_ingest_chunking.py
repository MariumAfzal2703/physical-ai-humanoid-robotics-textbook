from scripts.ingest import chunk_by_tokens, deterministic_id


def test_chunk_by_tokens_uses_overlap() -> None:
    text = ' '.join(f't{i}' for i in range(25))

    chunks = chunk_by_tokens(text, chunk_size=10, overlap=2)

    assert len(chunks) == 3
    assert chunks[0].split()[-2:] == chunks[1].split()[:2]


def test_deterministic_id_is_stable() -> None:
    first = deterministic_id('docs/module-1-ros2/overview.mdx', 0, 'chunk text')
    second = deterministic_id('docs/module-1-ros2/overview.mdx', 0, 'chunk text')

    assert first == second
    assert len(first) == 32
