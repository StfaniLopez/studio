import { GraduationCap, Lightbulb, Bot, BarChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/dashboard/Header';
import DashboardPage from '@/components/dashboard/DashboardPage';
import OptimalPathGenerator from '@/components/dashboard/OptimalPathGenerator';
import ElectiveRecommender from '@/components/dashboard/ElectiveRecommender';
import GraduationPredictor from '@/components/dashboard/GraduationPredictor';
import UserInfoCard from '@/components/dashboard/UserInfoCard';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/30">
      <Header />
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <UserInfoCard />
          <Tabs defaultValue="dashboard" className="grid w-full gap-4">
            <TabsList className="grid w-full grid-cols-2 h-auto md:grid-cols-4">
              <TabsTrigger value="dashboard">
                <GraduationCap className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="path-generator">
                <Bot className="mr-2 h-4 w-4" />
                Optimal Path
              </TabsTrigger>
              <TabsTrigger value="elective-recommender">
                <Lightbulb className="mr-2 h-4 w-4" />
                Electives
              </TabsTrigger>
              <TabsTrigger value="graduation-predictor">
                <BarChart className="mr-2 h-4 w-4" />
                Prediction
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <DashboardPage />
            </TabsContent>

            <TabsContent value="path-generator">
              <OptimalPathGenerator />
            </TabsContent>

            <TabsContent value="elective-recommender">
              <ElectiveRecommender />
            </TabsContent>

            <TabsContent value="graduation-predictor">
              <GraduationPredictor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
