import { useState, useEffect } from "react";
import { type testDto } from "../api/testApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Button } from "../components/ui/Button";
import { getTest, postTest } from "../api/testApi";
import { useToast } from "../components/ui/toast/ToastContext";

const Test = () => {
  const toast = useToast(5000);

  const [message, setMessage] = useState<string | null>(null);
  const [test, setTest] = useState<testDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTest() {
      const { data, message, error, loading } = await getTest();
      // const { data, message, error, loading } = await postTest({
      //   id: "1",
      //   name: "test post",
      // });
      if (cancelled) return;

      setTest(data ?? null);
      if (message) {
        setMessage(message);
      }
      if (error) {
        setError(error);
      }
      setLoading(loading);
    }

    fetchTest();

    toast("success", "test");
    toast("error", "test");
    toast(
      "info",
      "Join us for Open Source Friday as we explore Simulacrum! The powerful toolkit that allows you to simulate the GitHub API so you can build, test, and demo without hitting real servers. We’ll show how developers use Simulacrum to eliminate flaky tests, mock complex workflows, and preview integrations faster. ",
    );
    toast("warning", "test");

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!message) return;
    toast("success", message);
  }, [message]);

  useEffect(() => {
    if (!error) return;
    toast("error", error);
  }, [error]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      {loading && (
        <LoadingSpinner className="absolute top-0 right-0 bottom-0 left-0" />
      )}
      <div
        className={
          loading ? "pointer-events-none cursor-not-allowed opacity-50" : ""
        }
      >
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <p>{test?.name}</p>
        <p>{message}</p>
        <Button onClick={() => {}} label="Submit"></Button>
      </div>
    </div>
  );
};
export default Test;
