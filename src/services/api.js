const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Menu API
  async getMenuItems() {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  }

  async getMenuItemsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu items by category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu items by category:', error);
      throw error;
    }
  }

  async getMenuItem(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu item');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu item:', error);
      throw error;
    }
  }

  // Orders API
  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async getOrder(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  async updateOrderStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error('API health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('API health check error:', error);
      throw error;
    }
  }
}

export default new ApiService();

