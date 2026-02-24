import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";
import { unstable_cache } from "next/cache";

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

export const getProjects = unstable_cache(
  async () => {
    try {
      const projects = await prisma.project.findMany();
      return projects;
    } catch (error) {
      console.error("Failed to fetch projects (using mock data):", error);
      return MOCK_PROJECTS;
    }
  },
  ['all-projects'],
  {
    revalidate: 300, // Cache for 5 minutes
    tags: ['projects'],
  }
);
