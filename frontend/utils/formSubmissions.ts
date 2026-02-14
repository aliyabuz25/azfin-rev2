import { apiClient } from '../lib/apiClient';

export interface FormSubmission {
    id?: string;
    type: 'contact' | 'audit' | 'training';
    form_data: any;
    status?: 'new' | 'read' | 'archived';
    created_at?: string;
}

export const submitForm = async (type: FormSubmission['type'], data: any) => {
    try {
        await apiClient.post('/submissions', { type, form_data: data });
        return { result: { success: true }, error: null };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { result: null, error };
    }
};

export const fetchSubmissions = async (type?: FormSubmission['type']) => {
    try {
        const data = await apiClient.get('/submissions');
        let submissions = data as FormSubmission[];
        if (type) {
            submissions = submissions.filter(s => s.type === type);
        }
        return submissions;
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return [];
    }
};

export const updateSubmissionStatus = async (id: string, status: FormSubmission['status']) => {
    try {
        await apiClient.patch(`/submissions/${id}`, { status });
        return { data: { success: true }, error: null };
    } catch (error) {
        console.error('Error updating submission status:', error);
        return { data: null, error };
    }
};

export const deleteSubmission = async (id: string) => {
    try {
        await apiClient.delete(`/submissions/${id}`);
        return { success: true, error: null };
    } catch (error) {
        console.error('Error deleting submission:', error);
        return { success: false, error };
    }
};

