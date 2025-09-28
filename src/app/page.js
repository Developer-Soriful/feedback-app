
import FeedbackList from "@/components/FeedbackList"

async function getFeedback() {
  const baseUrl = 'http://localhost:3000';
  const url = `${baseUrl}/api/feedback`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch initial feedback');
  }
  const result = await res.json();
  return result.data || [];
}

const HomePage = async () => {
  const initialFeedback = await getFeedback();
  console.log(initialFeedback);

  return (
    <main className="min-h-screen  p-4 md:p-12">
      <div className="">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Mini Feedback App
        </h1>
        <FeedbackList initialFeedback={initialFeedback} />
      </div>
    </main>
  )
}

export default HomePage