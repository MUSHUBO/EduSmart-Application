import CreateAssignmentForm from "../components/assignment/CreateAssignmentForm";
import AssignmentBoard from "./AssignmentBoard";

export default function NewAssignmentPage() {
    return (
        <div className="bg-background min-h-screen py-12">
            <main className="container mx-auto px-4">
                <AssignmentBoard />
                
               
            </main>
        </div>
    );
}