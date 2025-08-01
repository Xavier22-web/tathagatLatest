const express = require('express');
const router = express.Router();
const StudyMaterial = require('../models/StudyMaterial');
const Admin = require('../models/Admin');
const MockTestSeries = require('../models/MockTestSeries');
const MockTest = require('../models/MockTest');
const MockTestQuestion = require('../models/MockTestQuestion');

// Add sample study materials
router.post('/add-sample-materials', async (req, res) => {
  try {
    console.log('🚀 Adding sample study materials...');

    // Get first admin user
    const admin = await Admin.findOne();
    
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'No admin user found. Please create an admin user first.'
      });
    }

    // Sample materials data
    const sampleMaterials = [
      {
        title: 'Quantitative Aptitude Formula Book',
        description: 'Complete formula book covering all topics of Quantitative Aptitude including Arithmetic, Algebra, Geometry, and Number Systems.',
        subject: 'Quantitative Aptitude',
        type: 'PDF',
        fileName: 'QA_Formula_Book.pdf',
        filePath: 'uploads/study-materials/sample-qa-formulas.txt',
        fileSize: '5.2 MB',
        tags: ['formulas', 'QA', 'reference', 'mathematics'],
        downloadCount: 1234,
        uploadedBy: admin._id,
        isActive: true
      },
      {
        title: 'Verbal Ability Video Lectures Series',
        description: 'Comprehensive video lecture series covering Reading Comprehension, Para Jumbles, Critical Reasoning, and Grammar.',
        subject: 'Verbal Ability',
        type: 'Video',
        fileName: 'VA_Video_Lectures.mp4',
        filePath: 'uploads/study-materials/sample-va-videos.txt',
        fileSize: '850 MB',
        tags: ['video', 'verbal', 'lectures', 'comprehension'],
        downloadCount: 856,
        uploadedBy: admin._id,
        isActive: true
      },
      {
        title: 'Data Interpretation Practice Sets',
        description: 'Collection of 50 practice sets for Data Interpretation covering Tables, Charts, Graphs, and Caselets.',
        subject: 'Data Interpretation',
        type: 'Practice Sets',
        fileName: 'DI_Practice_Sets.pdf',
        filePath: 'uploads/study-materials/sample-di-practice.txt',
        fileSize: '3.8 MB',
        tags: ['practice', 'DI', 'charts', 'graphs'],
        downloadCount: 945,
        uploadedBy: admin._id,
        isActive: true
      },
      {
        title: 'Logical Reasoning Shortcuts & Tricks',
        description: 'Quick shortcuts and time-saving tricks for solving Logical Reasoning questions efficiently.',
        subject: 'Logical Reasoning',
        type: 'Notes',
        fileName: 'LR_Shortcuts.pdf',
        filePath: 'uploads/study-materials/sample-lr-shortcuts.txt',
        fileSize: '2.1 MB',
        tags: ['shortcuts', 'tricks', 'logical reasoning', 'time-saving'],
        downloadCount: 672,
        uploadedBy: admin._id,
        isActive: true
      },
      {
        title: 'CAT Previous Year Papers (2010-2023)',
        description: 'Complete collection of CAT previous year question papers with detailed solutions and explanations.',
        subject: 'All Subjects',
        type: 'PDF',
        fileName: 'CAT_Previous_Papers.pdf',
        filePath: 'uploads/study-materials/sample-cat-papers.txt',
        fileSize: '12.5 MB',
        tags: ['previous papers', 'CAT', 'solutions', 'practice'],
        downloadCount: 2156,
        uploadedBy: admin._id,
        isActive: true
      },
      {
        title: 'Reading Comprehension Passages',
        description: 'Collection of high-quality Reading Comprehension passages from various topics with detailed explanations.',
        subject: 'Verbal Ability',
        type: 'PDF',
        fileName: 'RC_Passages.pdf',
        filePath: 'uploads/study-materials/sample-rc-passages.txt',
        fileSize: '7.3 MB',
        tags: ['reading comprehension', 'passages', 'verbal', 'practice'],
        downloadCount: 789,
        uploadedBy: admin._id,
        isActive: true
      },
      {
        title: 'Quantitative Aptitude Video Solutions',
        description: 'Video solutions for complex QA problems with step-by-step explanations and alternative methods.',
        subject: 'Quantitative Aptitude',
        type: 'Video',
        fileName: 'QA_Video_Solutions.mp4',
        filePath: 'uploads/study-materials/sample-qa-solutions.txt',
        fileSize: '1.2 GB',
        tags: ['video solutions', 'QA', 'problem solving', 'mathematics'],
        downloadCount: 543,
        uploadedBy: admin._id,
        isActive: true
      },
      {
        title: 'General Knowledge Current Affairs',
        description: 'Latest current affairs and general knowledge updates for competitive exam preparation.',
        subject: 'General Knowledge',
        type: 'PDF',
        fileName: 'GK_Current_Affairs.pdf',
        filePath: 'uploads/study-materials/sample-gk-current.txt',
        fileSize: '4.6 MB',
        tags: ['current affairs', 'GK', 'general knowledge', 'updates'],
        downloadCount: 421,
        uploadedBy: admin._id,
        isActive: true
      }
    ];

    // Clear existing materials to avoid duplicates
    await StudyMaterial.deleteMany({});
    console.log('🗑️ Cleared existing study materials');

    // Insert all materials
    const insertedMaterials = await StudyMaterial.insertMany(sampleMaterials);
    
    console.log(`✅ Successfully added ${insertedMaterials.length} study materials`);

    // Create summary
    const totalMaterials = await StudyMaterial.countDocuments();
    const bySubject = await StudyMaterial.aggregate([
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      message: `Successfully added ${insertedMaterials.length} study materials`,
      data: {
        totalMaterials,
        materialsBySubject: bySubject,
        materials: insertedMaterials
      }
    });

  } catch (error) {
    console.error('❌ Error adding sample materials:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding sample materials',
      error: error.message
    });
  }
});

// Get study materials count
router.get('/materials-count', async (req, res) => {
  try {
    const count = await StudyMaterial.countDocuments();
    const bySubject = await StudyMaterial.aggregate([
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalMaterials: count,
        materialsBySubject: bySubject
      }
    });
  } catch (error) {
    console.error('❌ Error getting materials count:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting materials count',
      error: error.message
    });
  }
});

// Add sample mock tests
router.post('/add-sample-mock-tests', async (req, res) => {
  try {
    console.log('🚀 Adding sample mock tests...');

    // Get first admin user
    let admin = await Admin.findOne();

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'No admin user found. Please create an admin user first.'
      });
    }

    // Clear existing mock test data
    await MockTestQuestion.deleteMany({});
    await MockTest.deleteMany({});
    await MockTestSeries.deleteMany({});
    console.log('🗑️ Cleared existing mock test data');

    // Sample mock test series
    const sampleSeries = [
      {
        title: 'CAT 2026 Mock Test Series',
        description: 'Comprehensive mock test series designed as per the latest CAT pattern with detailed analysis and explanations.',
        category: 'CAT',
        freeTests: 3,
        price: 499,
        validity: 365,
        isPublished: true,
        isActive: true,
        tags: ['CAT', 'latest-pattern', 'comprehensive', 'analysis'],
        createdBy: admin._id,
        publishedAt: new Date()
      },
      {
        title: 'XAT 2026 Complete Series',
        description: 'Full-length XAT mock tests with decision-making and essay writing practice.',
        category: 'XAT',
        freeTests: 2,
        price: 399,
        validity: 365,
        isPublished: true,
        isActive: true,
        tags: ['XAT', 'decision-making', 'essay', 'complete'],
        createdBy: admin._id,
        publishedAt: new Date()
      },
      {
        title: 'Free CAT Practice Tests',
        description: 'Free mock tests for CAT preparation with basic analysis.',
        category: 'CAT',
        freeTests: 5,
        price: 0,
        validity: 180,
        isPublished: true,
        isActive: true,
        tags: ['free', 'practice', 'CAT', 'basic'],
        createdBy: admin._id,
        publishedAt: new Date()
      }
    ];

    // Create mock test series
    const createdSeries = await MockTestSeries.insertMany(sampleSeries);
    console.log(`✅ Created ${createdSeries.length} mock test series`);

    // Sample questions
    const sampleQuestions = [
      {
        questionText: 'If the sum of first n natural numbers is 210, find the value of n.',
        questionType: 'MCQ',
        section: 'QA',
        topic: 'Sequences and Series',
        options: [
          { optionText: '18', isCorrect: false },
          { optionText: '19', isCorrect: false },
          { optionText: '20', isCorrect: true },
          { optionText: '21', isCorrect: false }
        ],
        correctAnswer: '20',
        explanation: 'Sum of first n natural numbers = n(n+1)/2 = 210. Solving: n(n+1) = 420. By trial, n = 20 gives 20×21 = 420.',
        marks: { positive: 3, negative: -1 },
        difficulty: 'Medium',
        createdBy: admin._id
      },
      {
        questionText: 'What is the next term in the sequence: 2, 6, 12, 20, 30, ?',
        questionType: 'MCQ',
        section: 'QA',
        topic: 'Number Patterns',
        options: [
          { optionText: '40', isCorrect: false },
          { optionText: '42', isCorrect: true },
          { optionText: '44', isCorrect: false },
          { optionText: '46', isCorrect: false }
        ],
        correctAnswer: '42',
        explanation: 'The differences are 4, 6, 8, 10... (increasing by 2). Next difference is 12, so 30 + 12 = 42.',
        marks: { positive: 3, negative: -1 },
        difficulty: 'Easy',
        createdBy: admin._id
      },
      {
        questionText: 'Which of the following words is most similar in meaning to "VERBOSE"?',
        questionType: 'MCQ',
        section: 'VARC',
        topic: 'Vocabulary',
        options: [
          { optionText: 'Concise', isCorrect: false },
          { optionText: 'Wordy', isCorrect: true },
          { optionText: 'Silent', isCorrect: false },
          { optionText: 'Clear', isCorrect: false }
        ],
        correctAnswer: 'Wordy',
        explanation: 'Verbose means using more words than needed, which is synonymous with wordy.',
        marks: { positive: 3, negative: -1 },
        difficulty: 'Easy',
        createdBy: admin._id
      }
    ];

    // Create questions
    const createdQuestions = await MockTestQuestion.insertMany(sampleQuestions);
    console.log(`✅ Created ${createdQuestions.length} sample questions`);

    // Sample mock tests for CAT series
    const catSeries = createdSeries.find(s => s.title.includes('CAT 2026'));
    const freeCatSeries = createdSeries.find(s => s.title.includes('Free CAT'));

    const sampleTests = [
      {
        title: 'CAT Mock Test 1 - Foundation Level',
        description: 'Foundation level mock test covering all three sections with moderate difficulty.',
        seriesId: catSeries._id,
        testNumber: 1,
        duration: 180,
        difficulty: 'Medium',
        isFree: true,
        isPublished: true,
        isActive: true,
        sections: [
          {
            name: 'VARC',
            duration: 60,
            totalQuestions: 3,
            totalMarks: 9,
            questions: createdQuestions.filter(q => q.section === 'VARC').map(q => q._id)
          },
          {
            name: 'DILR',
            duration: 60,
            totalQuestions: 3,
            totalMarks: 9,
            questions: []
          },
          {
            name: 'QA',
            duration: 60,
            totalQuestions: 3,
            totalMarks: 9,
            questions: createdQuestions.filter(q => q.section === 'QA').map(q => q._id)
          }
        ],
        totalQuestions: 9,
        totalMarks: 27,
        positiveMarks: 3,
        negativeMarks: 1,
        createdBy: admin._id,
        publishedAt: new Date()
      },
      {
        title: 'CAT Mock Test 2 - Intermediate Level',
        description: 'Intermediate level mock test with increased difficulty and time pressure.',
        seriesId: catSeries._id,
        testNumber: 2,
        duration: 180,
        difficulty: 'Medium',
        isFree: true,
        isPublished: true,
        isActive: true,
        sections: [
          {
            name: 'VARC',
            duration: 60,
            totalQuestions: 3,
            totalMarks: 9,
            questions: createdQuestions.filter(q => q.section === 'VARC').map(q => q._id)
          },
          {
            name: 'DILR',
            duration: 60,
            totalQuestions: 3,
            totalMarks: 9,
            questions: []
          },
          {
            name: 'QA',
            duration: 60,
            totalQuestions: 3,
            totalMarks: 9,
            questions: createdQuestions.filter(q => q.section === 'QA').map(q => q._id)
          }
        ],
        totalQuestions: 9,
        totalMarks: 27,
        positiveMarks: 3,
        negativeMarks: 1,
        createdBy: admin._id,
        publishedAt: new Date()
      },
      {
        title: 'Free CAT Practice Test 1',
        description: 'Free practice test for beginners.',
        seriesId: freeCatSeries._id,
        testNumber: 1,
        duration: 180,
        difficulty: 'Easy',
        isFree: true,
        isPublished: true,
        isActive: true,
        sections: [
          {
            name: 'VARC',
            duration: 60,
            totalQuestions: 2,
            totalMarks: 6,
            questions: createdQuestions.filter(q => q.section === 'VARC').map(q => q._id)
          },
          {
            name: 'QA',
            duration: 60,
            totalQuestions: 2,
            totalMarks: 6,
            questions: createdQuestions.filter(q => q.section === 'QA').map(q => q._id)
          }
        ],
        totalQuestions: 4,
        totalMarks: 12,
        positiveMarks: 3,
        negativeMarks: 1,
        createdBy: admin._id,
        publishedAt: new Date()
      }
    ];

    // Create mock tests
    const createdTests = await MockTest.insertMany(sampleTests);
    console.log(`✅ Created ${createdTests.length} mock tests`);

    // Update series with test counts
    await MockTestSeries.findByIdAndUpdate(catSeries._id, { totalTests: 2 });
    await MockTestSeries.findByIdAndUpdate(freeCatSeries._id, { totalTests: 1 });

    // Get summary
    const totalSeries = await MockTestSeries.countDocuments();
    const totalTests = await MockTest.countDocuments();
    const totalQuestions = await MockTestQuestion.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Successfully created sample mock tests',
      data: {
        series: totalSeries,
        tests: totalTests,
        questions: totalQuestions,
        createdSeries: createdSeries.map(s => ({ id: s._id, title: s.title })),
        createdTests: createdTests.map(t => ({ id: t._id, title: t.title, seriesId: t.seriesId }))
      }
    });

  } catch (error) {
    console.error('❌ Error adding sample mock tests:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding sample mock tests',
      error: error.message
    });
  }
});

module.exports = router;
