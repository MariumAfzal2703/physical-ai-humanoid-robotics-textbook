from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_health_contract() -> None:
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json() == {'status': 'ok'}


def test_chat_contract() -> None:
    response = client.post('/chat', json={'question': 'What is ROS 2?'})
    assert response.status_code == 200

    payload = response.json()
    assert isinstance(payload['answer'], str)
    assert isinstance(payload['sources'], list)
    assert isinstance(payload['session_id'], str)
    assert payload['session_id']
