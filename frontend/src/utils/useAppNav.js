import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// maps the page names used by the existing page components onto routes
export function useAppNav() {
  const navigate = useNavigate();
  return useCallback(
    (page, params = {}) => {
      switch (page) {
        case 'Home':
          navigate('/');
          break;
        case 'BrowseCars': {
          const q = new URLSearchParams();
          if (params.category_id) q.set('category_id', params.category_id);
          if (params.brand_id) q.set('brand_id', params.brand_id);
          const s = q.toString();
          navigate(`/cars${s ? `?${s}` : ''}`);
          break;
        }
        case 'CarDetails':
          navigate(`/cars/${params.car?.id ?? params.id}`);
          break;
        case 'Wishlist': navigate('/wishlist'); break;
        case 'History': navigate('/history'); break;
        case 'Profile': navigate('/profile'); break;
        case 'Settings': navigate('/settings'); break;
        case 'Support': navigate('/support'); break;
        case 'Login': navigate('/login'); break;
        case 'SignUp': navigate('/signup'); break;
        case 'Logout': navigate('/logout'); break;
        case 'Testimonials': navigate('/testimonials'); break;
        case 'Contact': navigate('/contact'); break;
        case 'Page': navigate(`/page/${params.type}`); break;
        case 'Admin': navigate('/admin'); break;
        default: navigate('/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate]
  );
}
