<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <form>
                    <h2>Sign Up for a Free Session</h2>
                    <label>Student Name: <input type="text" name="studentName" /></label>
                    <label>Grade: <input type="text" name="grade" /></label>
                    <label>School: <input type="text" name="school" /></label>
                    <label>Phone Number: <input type="tel" name="phoneNumber" placeholder="123-456-7890" /></label>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </Modal>