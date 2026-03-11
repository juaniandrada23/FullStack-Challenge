import { OrderList } from "./components/orders";
import { Footer } from "./components/ui";
import { ToastProvider } from "./providers/ToastProvider";

const App = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
        <main className="flex-1">
          <OrderList />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default App;
