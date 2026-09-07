import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialProducts,
  initialOrders,
  initialCustomers,
  initialSocialAccounts,
  initialSocialPosts,
  initialMessages,
  initialComments,
  initialReviews,
  initialCampaigns,
  initialStaff,
  initialApprovals,
  initialActivityLogs,
  initialNotifications,
  initialIntegrations
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Helper to load or fallback to initial
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`naran_${key}`);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      const jsonString = JSON.stringify(parsed);
      if (jsonString.includes('cleanwalk_hero_') || jsonString.includes('cleanwalk_product_')) {
        const cleaned = jsonString
          .replace(/\/cleanwalk_hero_[0-9]+\.png/g, '/cleanwalk_hero.png')
          .replace(/\/cleanwalk_product_[0-9]+\.png/g, '/cleanwalk_product.png');
        return JSON.parse(cleaned);
      }
      return parsed;
    } catch (e) {
      console.error(`Error loading state for ${key}`, e);
      return fallback;
    }
  };

  const defaultCustomer = {
    loggedIn: true,
    name: 'Victoria Sterling',
    email: 'victoria@example.com',
    phone: '+1 (555) 234-5678',
    address: '740 Park Ave, Apt 12B, New York, NY 10021',
    status: 'VIP'
  };

  const defaultAdmin = {
    loggedIn: true,
    name: 'Alexander Naran',
    email: 'admin@naranpetcare.com',
    role: 'Super Admin'
  };

  const [customerUser, setCustomerUser] = useState(() => {
    const loaded = loadState('customer_session', defaultCustomer);
    if (loaded && (loaded.email === 'v.sterling@luxury.com' || !loaded.email)) {
      return { ...loaded, email: 'victoria@example.com' };
    }
    return loaded;
  });
  const [adminUser, setAdminUser] = useState(() => loadState('admin_session', defaultAdmin));

  const [products, setProducts] = useState(() => loadState('products', initialProducts));
  const [orders, setOrders] = useState(() => loadState('orders', initialOrders));
  const [customers, setCustomers] = useState(() => loadState('customers', initialCustomers));
  const [cart, setCart] = useState(() => loadState('cart', []));
  const [socialPosts, setSocialPosts] = useState(() => loadState('socialPosts', initialSocialPosts));
  const [messages, setMessages] = useState(() => loadState('messages', initialMessages));
  const [comments, setComments] = useState(() => loadState('comments', initialComments));
  const [reviews, setReviews] = useState(() => loadState('reviews', initialReviews));
  const [campaigns, setCampaigns] = useState(() => loadState('campaigns', initialCampaigns));
  const [staff, setStaff] = useState(() => loadState('staff', initialStaff));
  const [approvals, setApprovals] = useState(() => loadState('approvals', initialApprovals));
  const [activityLogs, setActivityLogs] = useState(() => loadState('activityLogs', initialActivityLogs));
  const [notifications, setNotifications] = useState(() => loadState('notifications', initialNotifications));
  const [integrations, setIntegrations] = useState(() => loadState('integrations', initialIntegrations));
  
  const [currentRole, setCurrentRole] = useState(() => loadState('currentRole', 'Super Admin'));
  const [toasts, setToasts] = useState([]);

  // Save changes to localStorage
  useEffect(() => { localStorage.setItem('naran_customer_session', JSON.stringify(customerUser)); }, [customerUser]);
  useEffect(() => { localStorage.setItem('naran_admin_session', JSON.stringify(adminUser)); }, [adminUser]);
  useEffect(() => { localStorage.setItem('naran_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('naran_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('naran_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('naran_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('naran_socialPosts', JSON.stringify(socialPosts)); }, [socialPosts]);
  useEffect(() => { localStorage.setItem('naran_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('naran_comments', JSON.stringify(comments)); }, [comments]);
  useEffect(() => { localStorage.setItem('naran_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('naran_campaigns', JSON.stringify(campaigns)); }, [campaigns]);
  useEffect(() => { localStorage.setItem('naran_staff', JSON.stringify(staff)); }, [staff]);
  useEffect(() => { localStorage.setItem('naran_approvals', JSON.stringify(approvals)); }, [approvals]);
  useEffect(() => { localStorage.setItem('naran_activityLogs', JSON.stringify(activityLogs)); }, [activityLogs]);
  useEffect(() => { localStorage.setItem('naran_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('naran_integrations', JSON.stringify(integrations)); }, [integrations]);
  useEffect(() => { localStorage.setItem('naran_currentRole', JSON.stringify(currentRole)); }, [currentRole]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Log Activity Helper
  const logActivity = (action, module, description) => {
    const newLog = {
      id: `act-${Date.now()}`,
      user: adminUser?.loggedIn ? currentRole : 'Customer',
      action,
      module,
      description,
      timestamp: new Date().toLocaleString()
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Add Notification Helper
  const addNotification = (title, message, type = 'System Alert') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Customer Auth Functions
  const loginCustomer = (email, password) => {
    const found = customers.find(c => c.email.toLowerCase() === email.toLowerCase()) || {
      name: email.split('@')[0],
      email: email,
      phone: '+1 (555) 234-5678',
      address: '740 Park Ave, Apt 12B, New York, NY 10021',
      status: 'Active'
    };

    const session = {
      loggedIn: true,
      name: found.name || 'Victoria Sterling',
      email: email,
      phone: found.phone || '+1 (555) 234-5678',
      address: found.address || '740 Park Ave, Apt 12B, New York, NY 10021',
      status: found.status || 'Active'
    };

    setCustomerUser(session);
    showToast(`Welcome back, ${session.name}!`);
    return true;
  };

  const registerCustomer = (name, email, password) => {
    const newCust = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone: '+1 (555) 000-0000',
      ordersCount: 0,
      totalSpent: 0,
      avgOrderValue: 0,
      lastOrder: 'Never',
      status: 'Active',
      address: 'Add address in profile'
    };
    setCustomers(prev => [newCust, ...prev]);

    const session = {
      loggedIn: true,
      name,
      email,
      phone: newCust.phone,
      address: newCust.address,
      status: 'Active'
    };
    setCustomerUser(session);
    showToast(`Account registered for ${name}!`);
    return true;
  };

  const logoutCustomer = () => {
    setCustomerUser({ loggedIn: false });
    localStorage.removeItem('naran_customer_session');
    showToast('Customer logged out successfully.', 'info');
  };

  // Admin Auth Functions
  const loginAdmin = (email, password) => {
    const foundStaff = staff.find(s => s.email.toLowerCase() === email.toLowerCase());
    const role = foundStaff ? foundStaff.role : 'Super Admin';
    const name = foundStaff ? foundStaff.name : 'Alexander Naran';

    const session = {
      loggedIn: true,
      name,
      email,
      role
    };

    setAdminUser(session);
    setCurrentRole(role);
    logActivity('Admin Login', 'System', `Admin session started for ${email} (${role}).`);
    showToast(`Admin login successful. Role: ${role}`);
    return true;
  };

  const logoutAdmin = () => {
    setAdminUser({ loggedIn: false });
    localStorage.removeItem('naran_admin_session');
    logActivity('Admin Logout', 'System', 'Admin logged out.');
    showToast('Admin logged out successfully.', 'info');
  };

  // Cart Functions
  const addToCart = (product, size, qty = 1) => {
    const targetSize = size || (product.sizes ? product.sizes[0] : 'Standard');
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.size === targetSize
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + qty;
        if (newQty > product.inventory) {
          showToast(`Cannot add more than available stock (${product.inventory})`, 'error');
          return prevCart;
        }
        updated[existingIndex].quantity = newQty;
        return updated;
      } else {
        if (qty > product.inventory) {
          showToast(`Cannot add more than available stock (${product.inventory})`, 'error');
          return prevCart;
        }
        return [...prevCart, {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images ? product.images[0] : '',
          size: targetSize,
          quantity: qty,
          maxStock: product.inventory
        }];
      }
    });
    showToast(`Added ${product.name} (${targetSize}) to cart.`);
  };

  const updateCartQty = (productId, size, qty) => {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.size === size) {
          if (qty > item.maxStock) {
            showToast(`Max available stock is ${item.maxStock}`, 'error');
            return item;
          }
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.size === size)));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Checkout & Order Creation Workflow
  const placeOrder = (customerData) => {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return null;
    }

    const orderNum = `NARAN-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0.00 : 15.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const newOrder = {
      id: orderNum,
      customer: {
        name: `${customerData.firstName} ${customerData.lastName}`,
        email: customerData.email,
        phone: customerData.phone,
        address: `${customerData.street}, ${customerData.city}, ${customerData.state} ${customerData.zip}`
      },
      channel: 'Website',
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal,
      shipping,
      tax,
      total,
      paymentStatus: 'Paid',
      status: 'Processing',
      date: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartItem = cart.find((ci) => ci.productId === p.id);
        if (cartItem) {
          const newInv = Math.max(0, p.inventory - cartItem.quantity);
          let newStatus = p.status;
          if (newInv === 0) newStatus = 'Out of Stock';
          else if (newInv <= p.lowStockThreshold) newStatus = 'Low Stock';
          return { ...p, inventory: newInv, status: newStatus };
        }
        return p;
      })
    );

    setCustomers((prevCusts) => {
      const existingIndex = prevCusts.findIndex(c => c.email.toLowerCase() === customerData.email.toLowerCase());
      if (existingIndex > -1) {
        const updated = [...prevCusts];
        const cust = updated[existingIndex];
        cust.ordersCount += 1;
        cust.totalSpent += total;
        cust.avgOrderValue = cust.totalSpent / cust.ordersCount;
        cust.lastOrder = new Date().toISOString().split('T')[0];
        return updated;
      } else {
        const newCust = {
          id: `cust-${Date.now()}`,
          name: `${customerData.firstName} ${customerData.lastName}`,
          email: customerData.email,
          phone: customerData.phone,
          ordersCount: 1,
          totalSpent: total,
          avgOrderValue: total,
          lastOrder: new Date().toISOString().split('T')[0],
          status: 'Active',
          address: `${customerData.street}, ${customerData.city}, ${customerData.state} ${customerData.zip}`
        };
        return [newCust, ...prevCusts];
      }
    });

    clearCart();

    logActivity('Order Placed', 'Orders', `New order ${orderNum} placed by ${customerData.firstName} ${customerData.lastName} ($${total.toFixed(2)}).`);
    addNotification('New Order Received', `Order ${orderNum} ($${total.toFixed(2)}) placed by ${customerData.firstName}.`, 'New Order');

    showToast(`Order ${orderNum} successfully placed!`);
    return orderNum;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    logActivity('Order Status Updated', 'Orders', `Order ${orderId} status changed to ${newStatus}.`);
    addNotification('Order Status Changed', `Order ${orderId} updated to ${newStatus}.`, 'System Alert');
    showToast(`Order ${orderId} set to ${newStatus}.`);
  };

  const addProduct = (prodData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      status: prodData.inventory <= 0 ? 'Out of Stock' : prodData.inventory <= prodData.lowStockThreshold ? 'Low Stock' : 'In Stock',
      ...prodData
    };
    setProducts((prev) => [newProd, ...prev]);
    logActivity('Product Created', 'Products', `Created new product "${prodData.name}" (${prodData.sku}).`);
    showToast(`Product "${prodData.name}" created successfully.`);
  };

  const updateProduct = (productId, prodData) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedInv = prodData.inventory !== undefined ? Number(prodData.inventory) : p.inventory;
          const threshold = prodData.lowStockThreshold !== undefined ? Number(prodData.lowStockThreshold) : p.lowStockThreshold;
          let status = 'In Stock';
          if (updatedInv <= 0) status = 'Out of Stock';
          else if (updatedInv <= threshold) status = 'Low Stock';
          return { ...p, ...prodData, inventory: updatedInv, lowStockThreshold: threshold, status };
        }
        return p;
      })
    );
    logActivity('Product Updated', 'Products', `Updated product ID ${productId}.`);
    showToast('Product details updated.');
  };

  const deleteProduct = (productId) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    logActivity('Product Deleted', 'Products', `Deleted product "${target?.name || productId}".`);
    showToast('Product deleted.', 'info');
  };

  const duplicateProduct = (productId) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;
    const duplicated = {
      ...target,
      id: `prod-${Date.now()}`,
      name: `${target.name} (Copy)`,
      sku: `${target.sku}-COPY`
    };
    setProducts((prev) => [duplicated, ...prev]);
    logActivity('Product Duplicated', 'Products', `Duplicated product "${target.name}".`);
    showToast(`Duplicated ${target.name}.`);
  };

  const adjustStock = (productId, adjustmentAmount, reason) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newQty = Math.max(0, p.inventory + adjustmentAmount);
          let newStatus = 'In Stock';
          if (newQty <= 0) newStatus = 'Out of Stock';
          else if (newQty <= p.lowStockThreshold) newStatus = 'Low Stock';
          
          if (newQty <= p.lowStockThreshold) {
            addNotification('Low Stock Alert', `Product ${p.name} stock fell to ${newQty} units.`, 'Low Stock');
          }
          return { ...p, inventory: newQty, status: newStatus };
        }
        return p;
      })
    );
    logActivity('Inventory Adjusted', 'Inventory', `Stock adjusted by ${adjustmentAmount > 0 ? '+' : ''}${adjustmentAmount} for product ID ${productId}. Reason: ${reason}`);
    showToast('Inventory stock adjusted.');
  };

  const createSocialPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      likes: 0,
      comments: 0,
      shares: 0,
      publishedAt: postData.status === 'Published' ? new Date().toISOString() : null,
      ...postData
    };
    setSocialPosts((prev) => [newPost, ...prev]);
    logActivity('Social Post Created', 'Social Media', `Created ${postData.status} post for ${postData.platforms.join(', ')}.`);
    showToast(`Social post ${postData.status.toLowerCase()}!`);
  };

  const deleteSocialPost = (postId) => {
    setSocialPosts((prev) => prev.filter((p) => p.id !== postId));
    logActivity('Social Post Deleted', 'Social Media', `Deleted post ${postId}.`);
    showToast('Social post removed.', 'info');
  };

  const replyToMessage = (msgId, text) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          const updatedThread = [
            ...m.thread,
            { sender: 'NARAN Support', text, time: 'Just now', isUser: true }
          ];
          return { ...m, lastMessage: text, timestamp: 'Just now', thread: updatedThread };
        }
        return m;
      })
    );
    logActivity('Message Replied', 'Messages', `Replied to inbox thread ${msgId}.`);
    showToast('Reply sent.');
  };

  const markMessageResolved = (msgId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, resolved: true } : m))
    );
    showToast('Message marked as resolved.');
  };

  const replyComment = (commentId, text) => {
    logActivity('Comment Replied', 'Comments', `Replied to comment ${commentId}: "${text}"`);
    showToast('Comment reply published.');
  };

  const approveReview = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: 'Approved' } : r))
    );
    logActivity('Review Approved', 'Reviews', `Approved review ${reviewId}.`);
    showToast('Review approved.');
  };

  const createCampaign = (campData) => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      spent: 0,
      reach: '0',
      clicks: '0',
      conversions: 0,
      revenue: 0,
      roi: '0%',
      ...campData
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    logActivity('Campaign Created', 'Marketing', `Created marketing campaign "${campData.name}".`);
    showToast(`Campaign "${campData.name}" created.`);
  };

  const updateStaff = (staffId, updatedData) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, ...updatedData } : s))
    );
    logActivity('Staff Updated', 'Staff', `Updated staff member ${staffId}.`);
    showToast('Staff permissions updated.');
  };

  const approveRequest = (approvalId) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === approvalId ? { ...a, status: 'Approved' } : a))
    );
    logActivity('Approval Granted', 'Approvals', `Approved request ${approvalId}.`);
    showToast('Request approved successfully.');
  };

  const rejectRequest = (approvalId) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === approvalId ? { ...a, status: 'Rejected' } : a))
    );
    logActivity('Approval Rejected', 'Approvals', `Rejected request ${approvalId}.`);
    showToast('Request rejected.', 'info');
  };

  const toggleIntegration = (integId) => {
    setIntegrations((prev) =>
      prev.map((i) => {
        if (i.id === integId) {
          const nextState = !i.connected;
          logActivity(
            nextState ? 'Integration Connected' : 'Integration Disconnected',
            'Integrations',
            `${nextState ? 'Connected' : 'Disconnected'} platform ${i.name}.`
          );
          showToast(`${i.name} ${nextState ? 'connected' : 'disconnected'}.`);
          return { ...i, connected: nextState, lastSync: nextState ? 'Just now' : 'Never' };
        }
        return i;
      })
    );
  };

  const submitContactForm = (formData) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      platform: 'Website',
      sender: formData.email.split('@')[0],
      senderName: `${formData.name}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      lastMessage: formData.message,
      timestamp: 'Just now',
      resolved: false,
      thread: [
        { sender: formData.name, text: formData.message, time: 'Just now', isUser: false }
      ]
    };
    setMessages((prev) => [newMsg, ...prev]);
    logActivity('Contact Form Submission', 'Messages', `Received message from website visitor ${formData.name}.`);
    addNotification('New Contact Message', `New inquiry from ${formData.name}.`, 'New Message');
    showToast('Thank you! Your message has been sent to our team.');
  };

  const resetDemoData = () => {
    setCustomerUser(defaultCustomer);
    setAdminUser(defaultAdmin);
    setProducts(initialProducts);
    setOrders(initialOrders);
    setCustomers(initialCustomers);
    setCart([]);
    setSocialPosts(initialSocialPosts);
    setMessages(initialMessages);
    setComments(initialComments);
    setReviews(initialReviews);
    setCampaigns(initialCampaigns);
    setStaff(initialStaff);
    setApprovals(initialApprovals);
    setActivityLogs(initialActivityLogs);
    setNotifications(initialNotifications);
    setIntegrations(initialIntegrations);
    setCurrentRole('Super Admin');

    localStorage.clear();
    showToast('Demo data & sessions restored to default settings!');
  };

  return (
    <AppContext.Provider
      value={{
        customerUser,
        adminUser,
        products,
        orders,
        customers,
        cart,
        socialPosts,
        messages,
        comments,
        reviews,
        campaigns,
        staff,
        approvals,
        activityLogs,
        notifications,
        integrations,
        currentRole,
        toasts,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        loginAdmin,
        logoutAdmin,
        setCurrentRole,
        showToast,
        removeToast,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        adjustStock,
        createSocialPost,
        deleteSocialPost,
        replyToMessage,
        markMessageResolved,
        replyComment,
        approveReview,
        createCampaign,
        updateStaff,
        approveRequest,
        rejectRequest,
        toggleIntegration,
        submitContactForm,
        resetDemoData,
        logActivity,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
