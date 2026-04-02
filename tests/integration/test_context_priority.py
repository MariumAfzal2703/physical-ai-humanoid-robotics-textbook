from backend import rag


def test_selected_context_priority() -> None:
    context = 'Humanoid center-of-mass stabilization from selected paragraph.'
    answer, sources = rag.generate_answer('General question', context_text=context)

    assert 'selected passage' in answer.lower()
    assert context[:40] in answer
    assert sources == ['selected-context']
