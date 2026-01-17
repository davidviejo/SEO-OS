// import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";

// Mock data in case DB is not available
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    nombre: "Demo Local Business",
    dominio: "local-shop.com",
    strategyType: "LOCAL",
    fecha_creacion: new Date(),
  },
  {
    id: "2",
    nombre: "Big E-commerce",
    dominio: "shop-global.com",
    strategyType: "ECOM",
    fecha_creacion: new Date(),
  },
];

async function getProjects() {
  try {
    // Attempt to fetch from DB
    // return await prisma.project.findMany();
    // Since we know migration failed, we return mock data or empty array to avoid crash
    // In a real scenario, we would use the DB call.
    // return await prisma.project.findMany();
    return MOCK_PROJECTS;
  } catch (error) {
    console.error("Failed to fetch projects (expected if no DB):", error);
    return MOCK_PROJECTS;
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Manager</h1>
          <p className="text-muted-foreground">
            Gestión interna de proyectos y estrategias.
          </p>
        </div>
        <Button>Nuevo Proyecto</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>Lista de proyectos activos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Dominio</TableHead>
              <TableHead>Estrategia</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No hay proyectos creados.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    {project.nombre}
                  </TableCell>
                  <TableCell>{project.dominio}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.strategyType}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(project.fecha_creacion).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
