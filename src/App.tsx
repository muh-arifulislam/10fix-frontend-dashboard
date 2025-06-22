import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
