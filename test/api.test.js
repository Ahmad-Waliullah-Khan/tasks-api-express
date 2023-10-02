const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Task API', () => {
    let taskId;

    // Tests the POST /tasks endpoint (create a task)
    describe('POST /tasks', () => {
        it('should create a new task', (done) => {
            chai.request(app)
                .post('/tasks')
                .send({
                    title: 'New Task',
                    description: 'Task description',
                    status: 'open',
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.title).to.equal('New Task');
                    taskId = res.body.id;
                    done();
                });
        });
    });

    // Tests the PUT /tasks/:id endpoint (update a task)
    describe('PUT /tasks/:id', () => {
        it('should update an existing task', (done) => {
            chai.request(app)
                .put(`/tasks/${taskId}`)
                .send({
                    title: 'Updated Task',
                    description: 'Updated task description',
                    status: 'completed',
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.title).to.equal('Updated Task');
                    done();
                });
        });
    });

    // Tests the GET /tasks/metrics endpoint (get task metrics based on status)
    describe('GET /tasks/metrics', () => {
        it('should get task metrics based on status', (done) => {
            chai.request(app)
                .get('/tasks/metrics')
                .query({ type: 'status' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    });

    // Tests the GET /tasks/metrics endpoint (get task metrics based on timeline)
    describe('GET /tasks/metrics', () => {
        it('should get task metrics based on timeline', (done) => {
            chai.request(app)
                .get('/tasks/metrics')
                .query({ type: 'timeline' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
});