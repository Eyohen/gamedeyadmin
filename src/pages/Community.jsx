// import React, { useState } from 'react'
// import axios from 'axios';
// import { URL } from '../url';

// const Community = () => {
//   const [activeButton, setActiveButton] = useState('players'); // 'transaction history' or 'payout history' or 'non pitch'

//   const communities = [
//     {
//       id: 'BK001',
//       creator: 'John Smith',
//       name: 'NYC Football Club',
//       description: 'The largest football community...',
//       members: '200+',
//       date: '2025-06-08',
//     },
//     {
//       id: 'BK002',
//       creator: 'John Smith',
//       name: 'NYC Football Club',
//       description: 'The largest football community...',
//       members: '200+',
//       date: '2025-06-08',
//     },
//     {
//       id: 'BK003',
//       creator: 'John Smith',
//       name: 'NYC Football Club',
//       description: 'The largest football community...',
//       members: '200+',
//       date: '2025-06-08',
//     },
//     {
//       id: 'BK004',
//       creator: 'John Smith',
//       name: 'NYC Football Club',
//       description: 'The largest football community...',
//       members: '200+',
//       date: '2025-06-08',
//     },
//     {
//       id: 'BK005',
//       creator: 'John Smith',
//       name: 'NYC Football Club',
//       description: 'The largest football community...',
//       members: '200+',
//       date: '2025-06-08',
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active':
//         return 'bg-green-100 text-green-800';
//       case 'Inactive':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Deactivated':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
//   return (
//     <div className='px-6 py-6'>




// <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//   <table className="min-w-full">
//     <thead className="bg-gray-50">
//       <tr>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//           Community Name
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//           Members
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//           Creator
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//           Description
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//           Date Created
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {communities.map((booking) => (
//         <tr key={booking.id} className="hover:bg-gray-50">
//           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//             {booking.name}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//             {booking.members}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//             {booking.creator}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//             {booking.description}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//             {new Date(booking.date).toLocaleDateString()}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF] cursor-pointer hover:underline">
//             View Community
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>


//     </div>
//   )
// }

// export default Community






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    if (activeTab === 'posts') {
      fetchPosts();
    } else {
      fetchFlaggedContent();
    }
  }, [activeTab, pagination.page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/api/community/posts?page=${pagination.page}&limit=${pagination.limit}&sortBy=createdAt`);

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
      const response = await axios.get(`${URL}/api/admin/content/flagged?page=${pagination.page}&limit=${pagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Refresh flagged content
        fetchFlaggedContent();
      }
    } catch (err) {
      console.error('Error moderating content:', err);
      setError('Failed to moderate content');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'flagged':
        return 'bg-red-100 text-red-800';
      case 'hidden':
        return 'bg-yellow-100 text-yellow-800';
      case 'deleted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const renderPostsTable = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Comments
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Votes
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="max-w-xs truncate">
                  {post.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {post.User?.firstName} {post.User?.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="capitalize">{post.type || 'discussion'}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {post.commentsCount || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {post.votesCount || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#946BEF] cursor-pointer hover:underline">
                View Post
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFlaggedContentTable = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Content
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Flagged Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flaggedContent.map((content) => (
            <tr key={content.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="max-w-xs truncate">
                  {content.title || content.content?.substring(0, 50) + '...'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="capitalize">{content.contentType}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {content.User?.firstName} {content.User?.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(content.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(content.status)}`}>
                  {content.status}
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className='px-6 py-6'>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className='bg-gray-100 w-[300px] px-2 py-2 rounded-lg mb-6'>
        <div className='flex'>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'posts'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveTab('posts')}
          >
            All Posts
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'flagged'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveTab('flagged')}
          >
            Flagged Content
          </button>
        </div>
      </div>

      {/* Content Tables */}
      {activeTab === 'posts' && renderPostsTable()}
      {activeTab === 'flagged' && renderFlaggedContentTable()}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-gray-100 rounded-md">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50"
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