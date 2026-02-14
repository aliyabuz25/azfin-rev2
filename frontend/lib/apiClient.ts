
const API_BASE_URL = '/api';

export const apiClient = {
    async get(endpoint: string) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        return response.json();
    },
    async post(endpoint: string, body: any) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        return response.json();
    },
    async patch(endpoint: string, body: any) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        return response.json();
    },
    async delete(endpoint: string) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        return response.json();
    },
    async upload(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        return response.json();
    }
};
