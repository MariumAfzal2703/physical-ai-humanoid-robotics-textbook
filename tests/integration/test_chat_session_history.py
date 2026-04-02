from fastapi.testclient import TestClient

from backend import chat_store
from backend.main import app


client = TestClient(app)


def test_chat_session_history_persistence() -> None:
    chat_store._sessions.clear()

    first = client.post('/chat', json={'question': 'Explain ROS nodes'})
    assert first.status_code == 200
    session_id = first.json()['session_id']

    second = client.post(
        '/chat',
        json={
            'question': 'And simulation relation?',
            'session_id': session_id,
        },
    )
    assert second.status_code == 200
    assert second.json()['session_id'] == session_id

    messages = chat_store.get_messages(session_id)
    assert len(messages) == 4
    assert messages[0].role == 'user'
    assert messages[1].role == 'assistant'
    assert messages[2].role == 'user'
    assert messages[3].role == 'assistant'
