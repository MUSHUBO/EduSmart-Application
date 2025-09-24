import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; 
export default async function handler(req, res) {
    const { method } = req;
    
  
    const client = await clientPromise;
    const db = client.db("eduSmart"); 

    if (method === 'POST') {
        try {
            const { title, description, dueDate, teacherId } = req.body;

            
            if (!title || !description || !dueDate || !teacherId) {
                return res.status(400).json({ success: false, message: 'Missing required fields.' });
            }

            const newAssignment = {
                title,
                description,
                dueDate: new Date(dueDate), 
                teacherId: new ObjectId(teacherId), 
                createdAt: new Date(), 
            };
            
            const result = await db.collection("assignments").insertOne(newAssignment);
            
            res.status(201).json({ success: true, data: newAssignment });

        } catch (error) {
            console.error(error);
           
            if (error.name === 'BSONTypeError') {
                 return res.status(400).json({ success: false, message: 'Invalid teacherId format.' });
            }
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}