// routes/projectRoutes.js
const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['Manager', 'Admin']), projectController.createProject);
router.get('/', authMiddleware, projectController.getAllProjects);
router.get('/:projectId', authMiddleware, projectController.getProjectById);
router.put('/:projectId', authMiddleware, roleMiddleware(['Manager', 'Admin']), projectController.updateProject);
router.delete('/:projectId', authMiddleware, roleMiddleware(['Admin']), projectController.deleteProject);
router.post('/:projectId/team', authMiddleware, roleMiddleware(['Manager']), projectController.addTeamMember);
router.post('/:projectId/task', authMiddleware, roleMiddleware(['Manager']), projectController.addTask);

module.exports = router;



