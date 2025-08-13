// // pages/Community.jsx - for admin 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// const Community = () => {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [flaggedContent, setFlaggedContent] = useState([]);
//   const [activeTab, setActiveTab] = useState('posts');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });

//   useEffect(() => {
//     if (activeTab === 'posts') {
//       fetchPosts();
//     } else {
//       fetchFlaggedContent();
//     }
//   }, [activeTab, pagination.page]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${URL}/api/community/posts?page=${pagination.page}&limit=${pagination.limit}&sortBy=createdAt`);

//       if (response.data.success) {
//         setPosts(response.data.data);
//         setPagination(response.data.pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       setError('Failed to fetch community posts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFlaggedContent = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.get(`${URL}/api/admin/content/flagged?page=${pagination.page}&limit=${pagination.limit}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setFlaggedContent(response.data.data);
//         setPagination(response.data.pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching flagged content:', err);
//       setError('Failed to fetch flagged content');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const moderateContent = async (contentId, contentType, action, reason = '') => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.post(`${URL}/api/admin/content/moderate`, {
//         contentId,
//         contentType,
//         action,
//         reason
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         // Refresh flagged content
//         fetchFlaggedContent();
//       }
//     } catch (err) {
//       console.error('Error moderating content:', err);
//       setError('Failed to moderate content');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//         return 'bg-green-100 text-green-800';
//       case 'flagged':
//         return 'bg-red-100 text-red-800';
//       case 'hidden':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'deleted':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-blue-100 text-blue-800';
//     }
//   };

//   const renderPostsTable = () => (
//     <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Author
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Type
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Comments
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Votes
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Created
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {posts.map((post) => (
//             <tr key={post.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 <div className="max-w-xs truncate">
//                   {post.title}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {post.User?.firstName} {post.User?.lastName}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 <span className="capitalize">{post.type || 'discussion'}</span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {post.commentsCount || 0}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {post.votesCount || 0}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
//                   {post.status}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF] cursor-pointer hover:underline">
//                 View Post
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderFlaggedContentTable = () => (
//     <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Content
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Type
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Author
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Flagged Date
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {flaggedContent.map((content) => (
//             <tr key={content.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                 <div className="max-w-xs truncate">
//                   {content.title || content.content?.substring(0, 50) + '...'}
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 <span className="capitalize">{content.contentType}</span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {content.User?.firstName} {content.User?.lastName}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                 {new Date(content.updatedAt).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(content.status)}`}>
//                   {content.status}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
//                 <button
//                   onClick={() => moderateContent(content.id, content.contentType, 'approve')}
//                   className="text-green-600 hover:text-green-900 font-medium hover:underline"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => moderateContent(content.id, content.contentType, 'hide')}
//                   className="text-yellow-600 hover:text-yellow-900 font-medium hover:underline"
//                 >
//                   Hide
//                 </button>
//                 <button
//                   onClick={() => moderateContent(content.id, content.contentType, 'delete')}
//                   className="text-red-600 hover:text-red-900 font-medium hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className='px-6 py-6'>
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {/* Tab Navigation */}
//       <div className='bg-gray-100 w-[300px] px-2 py-2 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'posts'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveTab('posts')}
//           >
//             All Posts
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'flagged'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveTab('flagged')}
//           >
//             Flagged Content
//           </button>
//         </div>
//       </div>

//       {/* Content Tables */}
//       {activeTab === 'posts' && renderPostsTable()}
//       {activeTab === 'flagged' && renderFlaggedContentTable()}

//       {/* Pagination */}
//       {pagination.pages > 1 && (
//         <div className="flex justify-center mt-6">
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//               disabled={pagination.page === 1}
//               className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 bg-gray-100 rounded-md">
//               Page {pagination.page} of {pagination.pages}
//             </span>
//             <button
//               onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//               disabled={pagination.page === pagination.pages}
//               className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Community;






// pages/Community.jsx - Updated for admin with full moderation capabilities
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Flag,
  MessageCircle,
  TrendingUp,
  Users,
  BarChart3,
  RefreshCw,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    posts: { total: 0, active: 0, pending: 0, flagged: 0 },
    comments: { total: 0, active: 0, pending: 0 },
    engagement: { totalVotes: 0 }
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchCommunityStats();
    if (activeTab === 'posts') {
      fetchPosts();
    } else {
      fetchFlaggedContent();
    }
  }, [activeTab, pagination.page, statusFilter, searchTerm]);

  const fetchCommunityStats = async () => {
    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('admin_token');

        if (!token) {
      setError('Please login to access admin features');
      return;
    }

      const response = await axios.get(`${URL}/api/admin/community/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching community stats:', err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: searchTerm || undefined,
        showAll: true // Admin flag to see all posts
      };

      const response = await axios.get(`${URL}/api/community/posts`, { 
        params,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setPosts(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch community posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchFlaggedContent = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/admin/content/flagged`, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          type: 'all'
        },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setFlaggedContent(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching flagged content:', err);
      setError('Failed to fetch flagged content');
    } finally {
      setLoading(false);
    }
  };

  const moderateContent = async (contentId, contentType, action, reason = '') => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${URL}/api/admin/content/moderate`, {
        contentId,
        contentType,
        action,
        reason
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        // Refresh both lists and stats
        fetchCommunityStats();
        if (activeTab === 'posts') {
          fetchPosts();
        } else {
          fetchFlaggedContent();
        }
        alert(`Content ${action}d successfully!`);
      }
    } catch (err) {
      console.error('Error moderating content:', err);
      setError(`Failed to ${action} content`);
    }
  };

  const moderatePost = async (postId, action, reason = '') => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.patch(`${URL}/api/community/admin/posts/${postId}/moderate`, {
        action,
        reason
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        fetchCommunityStats();
        fetchPosts();
        alert(`Post ${action}ed successfully!`);
      }
    } catch (err) {
      console.error('Error moderating post:', err);
      setError(`Failed to ${action} post`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'flagged':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'hidden':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'deleted':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'flagged':
        return <Flag size={16} className="text-red-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-purple-600" />;
      default:
        return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Posts</p>
            <p className="text-2xl font-bold text-gray-900">{stats.posts.total}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex space-x-4 text-sm">
          <span className="text-green-600">Active: {stats.posts.active}</span>
          <span className="text-yellow-600">Pending: {stats.posts.pending}</span>
          <span className="text-red-600">Flagged: {stats.posts.flagged}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Comments</p>
            <p className="text-2xl font-bold text-gray-900">{stats.comments.total}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex space-x-4 text-sm">
          <span className="text-green-600">Active: {stats.comments.active}</span>
          <span className="text-yellow-600">Pending: {stats.comments.pending}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Votes</p>
            <p className="text-2xl font-bold text-gray-900">{stats.engagement.totalVotes}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Moderation Queue</p>
            <p className="text-2xl font-bold text-red-600">{stats.posts.pending + stats.comments.pending}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPostsTable = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Post Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Engagement
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="max-w-xs">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {post.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate mt-1">
                    {post.content?.substring(0, 100)}...
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {post.User?.firstName} {post.User?.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  {post.User?.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {post.type || 'discussion'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex space-x-4">
                  <span>👍 {post.upvotes || 0}</span>
                  <span>💬 {post.commentCount || 0}</span>
                  <span>👁️ {post.viewCount || 0}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(post.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(post.status)}`}>
                  {getStatusIcon(post.status)}
                  <span className="ml-1 capitalize">{post.status}</span>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                {post.status === 'pending' && (
                  <>
                    <button
                      onClick={() => moderatePost(post.id, 'approve')}
                      className="text-green-600 hover:text-green-900 font-medium hover:underline"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => moderatePost(post.id, 'reject', 'Content does not meet community guidelines')}
                      className="text-red-600 hover:text-red-900 font-medium hover:underline"
                    >
                      Reject
                    </button>
                  </>
                )}
                {post.status === 'active' && (
                  <button
                    onClick={() => moderatePost(post.id, 'flag', 'Flagged by admin for review')}
                    className="text-yellow-600 hover:text-yellow-900 font-medium hover:underline"
                  >
                    Flag
                  </button>
                )}
                <button
                  onClick={() => window.open(`/community/posts/${post.id}`, '_blank')}
                  className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
                >
                  <Eye size={16} className="inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFlaggedContentTable = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Content
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Flagged Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flaggedContent.map((content) => (
            <tr key={`${content.contentType}-${content.id}`} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="max-w-xs">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {content.title || content.content?.substring(0, 50) + '...'}
                  </div>
                  {content.Post && (
                    <div className="text-xs text-gray-500">
                      On post: {content.Post.title}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  content.contentType === 'post' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {content.contentType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {content.User?.firstName} {content.User?.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  {content.User?.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(content.updatedAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(content.status)}`}>
                  {getStatusIcon(content.status)}
                  <span className="ml-1 capitalize">{content.status}</span>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button
                  onClick={() => moderateContent(content.id, content.contentType, 'approve')}
                  className="text-green-600 hover:text-green-900 font-medium hover:underline"
                >
                  Approve
                </button>
                <button
                  onClick={() => moderateContent(content.id, content.contentType, 'hide')}
                  className="text-yellow-600 hover:text-yellow-900 font-medium hover:underline"
                >
                  Hide
                </button>
                <button
                  onClick={() => moderateContent(content.id, content.contentType, 'delete')}
                  className="text-red-600 hover:text-red-900 font-medium hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading && posts.length === 0 && flaggedContent.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-6 py-6'>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Management</h1>
          <p className="text-gray-600">Manage posts, comments, and community content</p>
        </div>
        <button
          onClick={() => {
            fetchCommunityStats();
            if (activeTab === 'posts') fetchPosts();
            else fetchFlaggedContent();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
          <button 
            onClick={() => setError('')}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        {/* Tab Navigation */}
        <div className='bg-gray-100 px-2 py-2 rounded-lg'>
          <div className='flex'>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'posts'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setActiveTab('posts')}
            >
              All Posts ({stats.posts.total})
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'flagged'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setActiveTab('flagged')}
            >
              Flagged Content ({stats.posts.pending + stats.comments.pending})
            </button>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter (for posts tab) */}
          {activeTab === 'posts' && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
            </select>
          )}
        </div>
      </div>

      {/* Content Tables */}
      {activeTab === 'posts' && renderPostsTable()}
      {activeTab === 'flagged' && renderFlaggedContentTable()}

      {/* Empty States */}
      {!loading && ((activeTab === 'posts' && posts.length === 0) || (activeTab === 'flagged' && flaggedContent.length === 0)) && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {activeTab === 'posts' ? (
              <MessageCircle size={32} className="text-gray-400" />
            ) : (
              <Flag size={32} className="text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === 'posts' ? 'No posts found' : 'No flagged content'}
          </h3>
          <p className="text-gray-500">
            {activeTab === 'posts' 
              ? 'No community posts match your current filters.' 
              : 'All content has been reviewed. Great job!'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={pagination.page === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNum = i + Math.max(1, pagination.page - 2);
                if (pageNum > pagination.pages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      pageNum === pagination.page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;