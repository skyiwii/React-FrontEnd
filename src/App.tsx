import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Registro from "./pages/public/Registro";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardCliente from "./pages/cliente/DashboardCliente";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import ContactosAdmin from "./pages/admin/ContactosAdmin";
import Productos from "./pages/public/Productos";
import ProductoDetalle from "./pages/public/ProductoDetalle";
import Nosotros from "./pages/public/Nosotros";
import Contacto from "./pages/public/Contacto";
import Blogs from "./pages/public/Blogs";
import BlogPost from "./pages/public/BlogPost";
import NotFound from "./pages/public/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route
          path="/intranet/admin"
          element={
            <ProtectedRoute soloAdmin>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intranet/cliente"
          element={
            <ProtectedRoute soloCliente>
              <DashboardCliente />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/intranet/admin/productos"
          element={
            <ProtectedRoute soloAdmin>
              <ProductosAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intranet/admin/categorias"
          element={
            <ProtectedRoute soloAdmin>
              <CategoriasAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intranet/admin/usuarios"
          element={
            <ProtectedRoute soloAdmin>
              <UsuariosAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intranet/admin/contactos"
          element={
            <ProtectedRoute soloAdmin>
              <ContactosAdmin />
            </ProtectedRoute>
          }
        />

        <Route 
        path="/productos" 
        element={
          <Productos />
         } 
        />

        <Route 
        path="/productos/:id" 
        element={<ProductoDetalle />

        } 
        />

        <Route 
        path="/nosotros" 
        element={<Nosotros />


        } 
        />

        <Route 
        path="/contacto" 
        element={<Contacto />

        } 
        />

        <Route 
        path="/blogs" 
        element={<Blogs />

        }
        />


        <Route 
        path="/blogs/:id" 
        element={<BlogPost /> 

        } 
        />

        <Route 
        path="*" 
        element={<NotFound />

        } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;