class TasksController < ApplicationController
  def new
    @gantt_chart = GanttChart.find_by_uid(params[:uid])
    @task = Task.new
    @task.gantt_chart_id = @gantt_chart.id
  end

  def create
    task_params = params[:task].permit('name', 'start', 'end', 'gantt_chart_id')
    @gantt_chart = GanttChart.find_by_uid(params[:uid])

    begin
      @task = Task.create!(task_params)
    rescue ActiveRecord::RecordInvalid => e
      flash.alert = e.message
      return redirect_to new_task_path(@gantt_chart.uid)
    end

    redirect_to show_gantt_chart_path(@gantt_chart.uid)
  end
end
