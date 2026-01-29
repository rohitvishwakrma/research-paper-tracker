const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Sample paper data for testing
const samplePapers = [
  {
    title: "Deep Learning for Natural Language Processing: A Survey",
    authors: "John Doe, Jane Smith",
    publicationYear: 2024,
    journal: "Journal of AI Research",
    doi: "10.1234/jair.2024.001",
    url: "https://example.com/paper1",
    abstract: "This paper provides a comprehensive survey of deep learning techniques applied to natural language processing tasks.",
    keywords: ["deep learning", "NLP", "transformers", "neural networks"],
    readingStage: "completed",
    priority: "high",
    notes: "Excellent overview of current state-of-the-art methods.",
    rating: 5
  },
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    publicationYear: 2017,
    journal: "NeurIPS",
    doi: "10.5555/nips.2017.1234",
    url: "https://example.com/paper2",
    abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks.",
    keywords: ["transformers", "attention", "neural machine translation"],
    readingStage: "reading",
    priority: "high",
    notes: "Foundational paper for transformer architecture.",
    rating: 5
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin et al.",
    publicationYear: 2019,
    journal: "NAACL",
    doi: "10.18653/v1/N19-1423",
    url: "https://example.com/paper3",
    abstract: "We introduce a new language representation model called BERT.",
    keywords: ["BERT", "language models", "pre-training"],
    readingStage: "to-read",
    priority: "medium",
    rating: 4
  },
  {
    title: "Neural Architecture Search: A Survey",
    authors: "Thomas Elsken, Jan Hendrik Metzen, Frank Hutter",
    publicationYear: 2019,
    journal: "JMLR",
    doi: "10.1234/jmlr.2019.567",
    url: "https://example.com/paper4",
    abstract: "This paper surveys the nascent field of neural architecture search.",
    keywords: ["AutoML", "neural architecture search", "optimization"],
    readingStage: "to-read",
    priority: "low",
    notes: "Interesting for future research directions."
  }
];

async function testAPI() {
  console.log('🧪 Testing Research Paper Tracker API\n');
  
  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const rootResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', rootResponse.data.message);
    console.log('');
    
    // Test 2: Add papers
    console.log('2. Adding sample papers...');
    const createdPapers = [];
    for (const paper of samplePapers) {
      const response = await axios.post(`${API_URL}/papers`, paper);
      createdPapers.push(response.data);
      console.log(`✅ Added: "${paper.title}"`);
    }
    console.log('');
    
    // Test 3: Get all papers
    console.log('3. Retrieving all papers...');
    const allPapersResponse = await axios.get(`${API_URL}/papers`);
    console.log(`✅ Found ${allPapersResponse.data.length} papers`);
    console.log('');
    
    // Test 4: Get specific paper
    console.log('4. Retrieving specific paper...');
    const firstPaperId = createdPapers[0]._id;
    const singlePaperResponse = await axios.get(`${API_URL}/papers/${firstPaperId}`);
    console.log(`✅ Retrieved: "${singlePaperResponse.data.title}"`);
    console.log('');
    
    // Test 5: Update paper
    console.log('5. Updating paper reading stage...');
    const updateResponse = await axios.put(`${API_URL}/papers/${firstPaperId}`, {
      readingStage: 'archived',
      notes: 'Updated notes after archiving'
    });
    console.log(`✅ Updated paper stage to: ${updateResponse.data.readingStage}`);
    console.log('');
    
    // Test 6: Get analytics
    console.log('6. Fetching analytics...');
    const analyticsResponse = await axios.get(`${API_URL}/papers/analytics/stats`);
    console.log('✅ Analytics:');
    console.log(`   Total Papers: ${analyticsResponse.data.totalPapers}`);
    console.log(`   By Stage:`, analyticsResponse.data.byStage);
    console.log(`   By Priority:`, analyticsResponse.data.byPriority);
    console.log(`   Average Rating: ${analyticsResponse.data.averageRating.toFixed(2)}`);
    console.log('');
    
    // Test 7: Delete a paper
    console.log('7. Deleting a paper...');
    const lastPaperId = createdPapers[createdPapers.length - 1]._id;
    await axios.delete(`${API_URL}/papers/${lastPaperId}`);
    console.log('✅ Paper deleted successfully');
    console.log('');
    
    // Final verification
    console.log('8. Final count...');
    const finalResponse = await axios.get(`${API_URL}/papers`);
    console.log(`✅ Remaining papers: ${finalResponse.data.length}`);
    console.log('');
    
    console.log('🎉 All tests passed successfully!\n');
    console.log('📊 Summary:');
    console.log('   - Created 4 papers');
    console.log('   - Retrieved all papers');
    console.log('   - Updated a paper');
    console.log('   - Fetched analytics');
    console.log('   - Deleted a paper');
    console.log('   - API is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Response:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   Make sure the server is running on http://localhost:5000');
    }
    process.exit(1);
  }
}

// Run tests
console.log('═══════════════════════════════════════════════');
console.log('  Research Paper Tracker - API Test Suite');
console.log('═══════════════════════════════════════════════\n');
testAPI();
