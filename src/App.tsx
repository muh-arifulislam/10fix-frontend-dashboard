import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./layout/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
