import type { Student } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  GraduationCapIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {student.nomEt} {student.prenomEt}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <UserIcon className="h-3.5 w-3.5" />
              {student.cin}
            </p>
          </div>
          <Badge>{student.ecole}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {/* <div className="flex items-center gap-2">
            <MailIcon className="h-4 w-4 text-muted-foreground" />
            <span>{student.email}</span>
          </div> */}
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>
              Date of Birth:{" "}
              {new Date(student.dateNaissance).toLocaleDateString()}
            </span>
          </div>
          {student.id_chambre && (
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
              <span>Room ID: {student.id_chambre}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
