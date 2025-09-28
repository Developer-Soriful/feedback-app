
export const feedbackData = [
    {
        id: 1,
        name: 'soriful',
        email: 'example@gmail.com',
        feedback: 'good application',
        timestamp: '09-28-2025'
    }
]
let currentId = feedbackData.length > 0 ? Math.max(...feedbackData.map(f => f.id)) + 1 : 1;
export const getNextId = () => {
    return currentId++
}